const con = require("../db");
require("dotenv").config();
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));

const home = (req, res) => {
  res.render("./task6/index");
};

const display = (req, res) => {
  year = req.query.year;
  month = req.query.month;

  if (year == undefined) {
    year = 2023;
  }
  if (month == undefined) {
    month = 12;
  }

  if (month == 12) {
    day = 31;
  } else if (month == 1) {
    day = 31;
  } else {
    day = 29;
  }

  let page = req.query.page;
  if (page == undefined || page == null) {
    page = 1;
  }
  current = page;

  con.query(
    `select task6_studentmaster.sid , task6_studentmaster.fname,  count(task6_attendence.attendence) as att from task6_studentmaster join task6_attendence where task6_studentmaster.sid = task6_attendence.aid and task6_attendence.attendence = "P" and MONTH(task6_attendence.date) =${month} group by task6_studentmaster.sid,task6_studentmaster.fname limit ${
      current * 5 - 5
    } , 5`,
    function (err, result, fields) {
      if (err) throw err;
      res.render("./task6/display", {
        data: result,
        month: month,
        year: year,
        day: day,
        current: current,
      });
    }
  );
};

const exam = (req, res) => {
  con.query(
    `select task6_studentmaster.sid,task6_studentmaster.email,task6_studentmaster.phone, task6_exam.sid, task6_studentmaster.fname , sum(task6_exam.prac) as prac , sum(task6_exam.theory) as theory from task6_studentmaster  join task6_exam where task6_studentmaster.sid = task6_exam.sid and task6_exam.type =1 group by task6_exam.sid;`,
    function (err, result1, fields) {
      if (err) throw err;
      con.query(
        `select task6_studentmaster.sid,task6_studentmaster.email,task6_studentmaster.phone, task6_exam.sid, task6_studentmaster.fname , sum(task6_exam.prac) as prac , sum(task6_exam.theory) as theory from task6_studentmaster  join task6_exam where task6_studentmaster.sid = task6_exam.sid and task6_exam.type =2 group by task6_exam.sid;`,
        function (err, result2, fields) {
          if (err) throw err;
          con.query(
            `select task6_studentmaster.sid,task6_studentmaster.email,task6_studentmaster.phone, task6_exam.sid, task6_studentmaster.fname , sum(task6_exam.prac) as prac , sum(task6_exam.theory) as theory from task6_studentmaster  join task6_exam where task6_studentmaster.sid = task6_exam.sid and task6_exam.type =3 group by task6_exam.sid;`,
            function (err, result3, fields) {
              if (err) throw err;
              res.render("./task6/exam", {
                data1: result1,
                data2: result2,
                data3: result3,
              });
            }
          );
        }
      );
    }
  );
};

const studentdetails = (req, res) => {
  const t = parseInt(req.query.data);

  const temp = t + 1;

  con.query(
    `select sid, subid , theory , prac from task6_exam where type =1 and sid = ${temp};`,
    function (err, result1, fields) {
      if (err) throw err;
      con.query(
        `select subid , theory , prac from task6_exam where type =2 and sid = ${temp};`,
        function (err, result2, fields) {
          if (err) throw err;

          con.query(
            `select subid , theory , prac from task6_exam where type =3 and sid = ${temp};`,
            function (err, result3, fields) {
              if (err) throw err;
              con.query(
                `select task6_studentmaster.sid as sid,   count(attendence) as att from task6_studentmaster join task6_attendence where task6_studentmaster.sid = task6_attendence.aid and task6_attendence.attendence = "P"  group by task6_studentmaster.sid;
                  `,
                function (err, result4, fields) {
                  if (err) throw err;
                  res.render("./task6/student", {
                    data1: result1,
                    data2: result2,
                    data3: result3,
                    data4: result4,
                    temp: temp,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};

const exampost = (req, res) => {
  const body = req.body;
  const name = body.fname;
  const email = body.email;
  const phone = body.contact;
  const opt = req.body.opt;
  console.log(opt);

  if (opt == "and") {
    con.query(
      `select task6_studentmaster.sid,task6_studentmaster.email,task6_studentmaster.phone, task6_exam.sid, task6_studentmaster.fname , sum(task6_exam.prac) as prac , sum(task6_exam.theory) as theory from task6_studentmaster  join task6_exam where task6_studentmaster.fname = "${name}" and task6_studentmaster.email = "${email}" and task6_studentmaster.phone = "${phone}" and task6_studentmaster.sid = task6_exam.sid and task6_exam.type =1 group by task6_exam.sid;`,
      function (err, result1, fields) {
        if (err) throw err;
        con.query(
          `select task6_studentmaster.sid,task6_studentmaster.email,task6_studentmaster.phone, task6_exam.sid, task6_studentmaster.fname , sum(task6_exam.prac) as prac , sum(task6_exam.theory) as theory from task6_studentmaster  join task6_exam where task6_studentmaster.fname = "${name}" and task6_studentmaster.email = "${email}" and task6_studentmaster.phone = "${phone}" and task6_studentmaster.sid = task6_exam.sid and task6_exam.type =2 group by task6_exam.sid;`,
          function (err, result2, fields) {
            if (err) throw err;
            con.query(
              `select task6_studentmaster.sid,task6_studentmaster.email,task6_studentmaster.phone, task6_exam.sid, task6_studentmaster.fname , sum(task6_exam.prac) as prac , sum(task6_exam.theory) as theory from task6_studentmaster  join task6_exam where task6_studentmaster.fname = "${name}" and task6_studentmaster.email = "${email}" and task6_studentmaster.phone = "${phone}" and task6_studentmaster.sid = task6_exam.sid and task6_exam.type =3 group by task6_exam.sid;`,
              function (err, result3, fields) {
                if (err) throw err;

                // console.log(result1,result2,result3,);
                res.render("exam", {
                  data1: result1,
                  data2: result2,
                  data3: result3,
                });
              }
            );
          }
        );
      }
    );
  } else {
    console.log("inside");
    con.query(
      `select task6_studentmaster.sid,task6_studentmaster.email,task6_studentmaster.phone, task6_exam.sid, task6_studentmaster.fname , sum(task6_exam.prac) as prac , sum(task6_exam.theory) as theory from task6_studentmaster  join task6_exam where 
      (task6_studentmaster.fname = "${name}" or task6_studentmaster.email = "${email}" or task6_studentmaster.phone = "${phone}") and task6_studentmaster.sid = task6_exam.sid and task6_exam.type =1 group by task6_exam.sid;`,
      function (err, result1, fields) {
        if (err) throw err;
        con.query(
          `select task6_studentmaster.sid,task6_studentmaster.email,task6_studentmaster.phone, task6_exam.sid, task6_studentmaster.fname , sum(task6_exam.prac) as prac , sum(task6_exam.theory) as theory from task6_studentmaster  join task6_exam where (task6_studentmaster.fname = "${name}" or task6_studentmaster.email = "${email}" or task6_studentmaster.phone = "${phone}") and task6_studentmaster.sid = task6_exam.sid and task6_exam.type =2 group by task6_exam.sid;`,
          function (err, result2, fields) {
            if (err) throw err;
            con.query(
              `select task6_studentmaster.sid,task6_studentmaster.email,task6_studentmaster.phone, task6_exam.sid, task6_studentmaster.fname , sum(task6_exam.prac) as prac , sum(task6_exam.theory) as theory from task6_studentmaster  join task6_exam where (task6_studentmaster.fname = "${name}" or task6_studentmaster.email = "${email}" or task6_studentmaster.phone = "${phone}") and task6_studentmaster.sid = task6_exam.sid and task6_exam.type =3 group by task6_exam.sid;`,
              function (err, result3, fields) {
                if (err) throw err;

                res.render("exam", {
                  data1: result1,
                  data2: result2,
                  data3: result3,
                });
              }
            );
          }
        );
      }
    );
  }
};

module.exports = {
  display,
  exam,
  studentdetails,
  exampost,
  home,
};
