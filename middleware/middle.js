const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const mysql = require("mysql2");
const con = require("../db");

function cookieExtractor(req) {
  // if()
  let token;

  if (req && req.headers.cookie) {
    token = req.headers.cookie.split("=")[1];
  }
  return token;
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: "secret",
};

module.exports = function authenticateToken(passport) {
  passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      con.query(
        "select * from login where email = ?",
        [jwtPayload.email],
        function (err, result, fields) {
          try {
            if (err) throw err;

            let user = result[0];
            if (jwtPayload.email === user.email) {
              return done(null, { email: user.email });
            } else {
              console.log("noooo");
            }
          } catch (err) {
            return res.render("../views/error.ejs");
          }
        }
      );
    })
  );
};
