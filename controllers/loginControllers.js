const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const md5 = require("md5");
const crypto = require("crypto");
const schedule = require("node-schedule");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const con = require("../db");
require("dotenv").config();

let incorrectAttempts = 0;
let maxIncorrectAttepts = 3;

const JWT_SECRET = process.env.JWT_SECRET;

const login = (req, res) => {
  res.render("./loginTask/login", {
    text: "",
    incorrectAttempts: 0,
    riddle: "",
  });
};

const postLogin = (req, res) => {
  try {
    let val1 = parseInt(Math.random() * (9 - 0 + 1) + 0);
    let val2 = parseInt(Math.random() * (9 - 0 + 1) + 0);
    const { email, password, riddle } = req.body;

    con.query(
      "select * from login where email = ?",
      [email],
      (error, results) => {
        if (error) {
          return res.status(500).send("Internal server Error");
        }

        if (results.length === 0) {
          const text = `Invalid username or password.`;
          return res.render("/loginTask/login", {
            text,
            incorrectAttempts: 0,
            riddle: "",
          });
        }

        const user = results[0];
        const salt = user.salt;
        const concatPassword = password + salt;
        const encryptPassword = md5(concatPassword);

        if (encryptPassword !== user.password) {
          ++incorrectAttempts;

          if (incorrectAttempts < maxIncorrectAttepts) {
            const text = `Invalid username or password.`;
            return res.render("login", { text, incorrectAttempts, riddle: "" });
          } else {
            const riddle = `${val1} + ${val2}`;
            const text = `Invalid username or password.`;
            return res.render("login", { text, riddle, incorrectAttempts });
          }
        }

        if (user.activated != 1) {
          return res
            .status(401)
            .send(
              "Account is not activated. Please check your email for the activation link."
            );
        }

        if (incorrectAttempts >= 3) {
          if (riddle == eval(riddle)) {
            incorrectAttempts = 0;
            return res.render("success");
          }
        }
        incorrectAttempts = 0;

        //////////////////////////////////////////////////////////////////
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
          expiresIn: "1h",
        });

        res.cookie("token", token, { httpOnly: true });

        res.redirect("/protected");
        //////////////////////////////////////////////////////////////////
      }
    );
  } catch (error) {
    console.log(error);
    res.render("../views/error.ejs");
  }
};

const register = (req, res) => {
  res.render("./loginTask/register");
};

const postRegister = (req, res) => {
  const { username, password, email } = req.body;

  con.query(
    `select username from login where email =  "${email}"`,
    (error, result) => {
      if (error) {
        console.error("Error in database:", error);
        return res.status(500).send("Internal Server Error");
      }
      if (result.length > 0) {
        return res.status(409).send("user already exist!");
      } else {
        const activationToken = crypto.randomBytes(16).toString("hex");
        const salt = crypto.randomBytes(2).toString("hex").padEnd(4, "0");
        const concatPassword = password + salt;
        const encryptPassword = md5(concatPassword);

        con.query(
          "insert into login (username, password, salt, activation_token, activated , email,created_at) values (?, ?, ?, ?, ?, ?, ? )",
          [
            username,
            encryptPassword,
            salt,
            activationToken,
            false,
            email,
            new Date(),
          ],
          (error, results) => {
            if (error) {
              console.error("Error inserting user into database:", error);
              return res.status(500).send("Internal Server Error");
            }
            res.render("./loginTask/registration_success", { activationToken });
          }
        );
      }
    }
  );
};

const activateToken = (req, res) => {
  const { token } = req.params;

  con.query(
    "select * from login where activation_token = ?",
    [token],
    (error, results) => {
      if (error) {
        console.error("Error in database:", error);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(404).send("Invalid activation link.");
      }

      con.query(
        "UPDATE login SET activated = true WHERE activation_token = ?",
        [token],
        (error, result1) => {
          if (error) {
            console.error("Error updating user account:", error);
            return res.status(500).send("Internal Server Error");
          }

          if (result1.affectedRows === 0) {
            return res.status(404).send("Invalid activation link.");
          }

          res.send(
            "Your account has been activated successfully. You can now login."
          );
        }
      );
    }
  );
};

const forgotpass = (req, res) => {
  res.render("./loginTask/resetpass");
};

const setpass = (req, res) => {
  const { email } = req.body;

  let sql = `select * from login where email = '${email}'`;
  con.query(sql, (error, result) => {
    if (error) {
      console.error("Error in database:", error);
      return res.status(500).send("Internal Server Error");
    }
    if (result.length > 0) {
      let user = result[0];
      const uid = user.uid;
      let activationToken = user.activation_token;
      res.render("./loginTask/validatetoken", { activationToken, uid });
    } else {
      return res.status(404).send("User not found.");
    }
  });
};

const reset = (req, res) => {
  const { uid, activationToken } = req.params;
  res.render("./loginTask/updatepass", { uid, activationToken });
};

const checkpass = (req, res) => {
  let { uid, activationToken } = req.params;
  let { pass1, pass2 } = req.body;
  if (pass1 !== pass2) {
    return res.send("Password doesn't match.");
  }

  con.query(
    `select * from login where uid = ? and activation_token = ? `,
    [uid, activationToken],
    (error, result1) => {
      if (error) {
        console.error("Error in database:", error);
        return res.status(500).send("Internal Server Error");
      }
      const user = result1[0];
      if (result1.length > 0) {
        const salt = user.salt;
        const concatPassword = pass1 + salt;
        const encryptPassword = md5(concatPassword);

        con.query(
          `update login set password = ? where uid = ?`,
          [encryptPassword, uid],
          (error, result2) => {
            if (error) {
              console.error("Error in database:", error);
              return res.status(500).send("Internal Server Error");
            }
            return res.send("Password Updated successfully...");
          }
        );
      } else {
        return res.status(404).send("User not found.");
      }
    }
  );
};

module.exports = {
  login,
  postLogin,
  register,
  postRegister,
  activateToken,
  forgotpass,
  setpass,
  reset,
  checkpass,
};
