const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "login",
});

con.connect(function (err) {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

function cookieExtractor(req) {
  let token = req.headers.cookie.split("=")[1];
  console.log(token);
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  console.log(token, "dfjbikjv");
  return token;
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: "secret",
};

module.exports = function authenticateToken(passport) {
  passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      // console.log(jwtPayload.email, "email");
      con.query(
        "select * from users where email = ?",
        [jwtPayload.email],
        function (err, result, fields) {
          if (err) throw err;
          console.log(result, "result");

          let user = result[0];
          if (jwtPayload.email === user.email) {
            console.log("hello");
            return done(null, { email: user.email });
          } else {
            console.log("noooo");
          }
        }
      );
    })
  );
};
