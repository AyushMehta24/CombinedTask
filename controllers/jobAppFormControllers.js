const con = require("../db");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const display = (req, res) => {
  res.render("./jobAppForm/display");
};

const updated = (req, res) => {
  const sql = `select eid from all_tasks0.task12_basic_details`;
  con.query(sql, function (err, result) {
    if (err) return res.render("../views/error.ejs");
    const key = Object.keys(result[0]);

    res.render("./jobAppForm/update", { id: result });
  });
};

const form = (req, res) => {
  res.render("./jobAppForm/index", { result: "false", key: "" });
};

const submitform = (req, res) => {
  let {
    hidden,
    first_name,
    last_name,
    designation,
    email,
    addressline1,
    addressline2,
    state,
    city,
    zipcode,
    phonenumber,
    gender,
    relationship,
    dob,
    ///////////
    course,
    year,
    percentage,
    //////////
    compnay_name,
    workdesignation,
    from,
    to,
    ///////////
    rn,
    rc,
    rr,
    ///////////
    languages,
    hindiradio,
    englishradio,
    gujaratiradio,
    ///////////
    technologies,
    tech1,
    tech2,
    tech3,
    tech4,
    ///////////
    preferdlocation,
    noticeperiod,
    expectedctc,
    currentctc,
    department,
  } = req.body;

  if (hidden == "") {
    sql1 = `insert into task12_basic_details (fname,lname,add1,add2,city,state,zipcode,phone,designation,gender,relationshipstatus,dob,email) values ("${first_name}","${last_name}","${addressline1}","${addressline2}","${city}","${state}","${zipcode}","${phonenumber}","${designation}","${gender}","${relationship}","${dob}","${email}")`;
    con.query(sql1, function (err, result1) {
      if (err) return res.render("../views/error.ejs");
      console.log(result1.insertId);
      other(result1.insertId);
    });

    function other(id) {
      let sql = ``;

      ///////////////////////////////////////////////////////////////////////

      //task12_education
      let newcourse = course.filter(function (el) {
        return el != "";
      });
      let newyear = year.filter(function (el) {
        return el != "";
      });
      let newpercentage = percentage.filter(function (el) {
        return el != "";
      });

      for (let i = 0; i < newcourse.length; i++) {
        sql = `insert into task12_education (eid , coursename , passingyear , percentage) values (${id} , "${newcourse[i]}" , ${newyear[i]} , ${newpercentage[i]})`;
        con.query(sql, function (err, result) {
          if (err) return res.render("../views/error.ejs");
        });
      }

      ///////////////////////////////////////////////////////////

      //fianl work

      if (compnay_name.length > 0) {
        let newcompnay, newworkdesignation, newfrom, newto;
        newcompnay = compnay_name.filter(function (el) {
          return el != "";
        });
        newworkdesignation = workdesignation.filter(function (el) {
          return el != "";
        });
        newfrom = from.filter(function (el) {
          return el != "";
        });
        newto = to.filter(function (el) {
          return el != "";
        });
        for (let i = 0; i < newcompnay.length; i++) {
          sql = `insert into task12_experience (eid , compnayname ,designation ,start , end) values (${id} , "${newcompnay[i]}" , "${newworkdesignation[i]}" , "${newfrom[i]}","${newto[i]}")`;
          con.query(sql, function (err, result) {
            if (err) return res.render("../views/error.ejs");
          });
        }
      }

      //////////////////////////////////////////////////////////////////

      //final references

      let newrname = rn.filter(function (el) {
        return el != "";
      });
      let newrnumber = rc.filter(function (el) {
        return el != "";
      });
      let newrelation = rr.filter(function (el) {
        return el != "";
      });
      //
      for (let i = 0; i < newrname.length; i++) {
        sql = `insert into task12_reference (eid , name ,contact ,relation) values (${id} , "${newrname[i]}" , ${newrnumber[i]} , "${newrelation[i]}")`;
        con.query(sql, function (err, result) {
          if (err) return res.render("../views/error.ejs");
        });
      }

      ////////////////////////////////////////////////////////////////

      //fianl languages
      if (languages) {
        if (languages.includes("gujarati")) {
          if (!gujaratiradio.includes("read")) {
            gujaratiradio.splice(0, 0, "");
          }
          if (!gujaratiradio.includes("write")) {
            gujaratiradio.splice(1, 0, "");
          }
          if (!gujaratiradio.includes("speak")) {
            gujaratiradio.splice(2, 0, "");
          }
        }

        if (languages.includes("hindi")) {
          if (!hindiradio.includes("read")) {
            hindiradio.splice(0, 0, "");
          }
          if (!hindiradio.includes("write")) {
            hindiradio.splice(1, 0, "");
          }
          if (!hindiradio.includes("speak")) {
            hindiradio.splice(2, 0, "");
          }
        }

        if (languages.includes("english")) {
          if (!englishradio.includes("read")) {
            englishradio.splice(0, 0, "");
          }
          if (!englishradio.includes("write")) {
            englishradio.splice(1, 0, "");
          }
          if (!englishradio.includes("speak")) {
            englishradio.splice(2, 0, "");
          }
        }

        let newer, newgr, newhr;

        if (languages.includes("gujarati")) {
          newgr = gujaratiradio.filter(function (el) {
            return el != "";
          });
        }

        if (languages.includes("english")) {
          newer = englishradio.filter(function (el) {
            return el != "";
          });
        }

        if (languages.includes("hindi")) {
          newhr = hindiradio.filter(function (el) {
            return el != "";
          });
        }

        let templan = [];
        if (newhr !== undefined) {
          templan.push(newhr);
        }
        if (newer !== undefined) {
          templan.push(newer);
        }
        if (newgr !== undefined) {
          templan.push(newgr);
        }

        for (let i = 0; i < languages.length; i++) {
          for (let j = 0; j < templan[i].length; j++) {
            sql = `insert into task12_language (eid , languagename , type) values (${id} , "${languages[i]}", "${templan[i][j]}")`;
            con.query(sql, function (err, result) {
              if (err) return res.render("../views/error.ejs");
            });
          }
        }
      }

      ///////////////////////////////////////////////////////////////////////

      //fianl technolgy

      if (technologies) {
        let temptech = [];
        if (tech1 !== undefined) {
          temptech.push(tech1);
        }
        if (tech2 !== undefined) {
          temptech.push(tech2);
        }
        if (tech3 !== undefined) {
          temptech.push(tech3);
        }
        if (tech4 !== undefined) {
          temptech.push(tech4);
        }

        for (let i = 0; i < technologies.length; i++) {
          sql = `insert into task12_technology (eid ,  technology , type) values (${id} , "${technologies[i]}", "${temptech[i]}")`;
          con.query(sql, function (err, result) {
            if (err) return res.render("../views/error.ejs");
          });
        }
      }

      ///////////////////////////////////////////////////////////////

      let templocation = [];
      let tempcctc = currentctc;
      let tempnperiod = noticeperiod;
      if (typeof preferdlocation == "string") {
        templocation.push(preferdlocation);
      }
      if (tempnperiod == "") {
        tempnperiod = 1;
      }
      if (tempcctc == "") {
        tempcctc = 0;
      }
      if (preferdlocation) {
        for (let i = 0; i < preferdlocation.length; i++) {
          sql = `insert into task12_preference (eid,location,noticeperiod,expectedCTC,currentCTC,department) values (${id},"${preferdlocation[i]}", ${tempnperiod}, ${expectedctc}, ${tempcctc} , "${department}")`;
          con.query(sql, function (err, result) {
            if (err) return res.render("../views/error.ejs");
          });
        }
      }
    }
  } else {
    // "object");

    //basic details

    let sql = `update task12_basic_details set fname = "${first_name}" , lname = "${last_name}" , add1 = "${addressline1}" , add2 = "${addressline2}" , city = "${city}" , state = "${state}" , zipcode = 
      ${zipcode} , phone = ${phonenumber} , designation = "${designation}" , gender = "${gender}" , relationshipstatus = "${relationship}" , dob = "${dob}" , email = "${email}" where eid = ${hidden} `;
    // sql);

    con.query(sql, function (err, result) {
      if (err) return res.render("../views/error.ejs");
      // result.insertId);
    });

    //work

    sql = `delete from task12_experience  where eid = ${hidden}`;
    // sql);
    con.query(sql, function (err, result) {
      if (err) return res.render("../views/error.ejs");
    });

    let newcom = compnay_name.filter(function (el) {
      return el != "";
    });

    for (let i = 0; i < newcom.length; i++) {
      sql = `insert into task12_experience (eid , compnayname ,designation ,start , end) values (${hidden} , "${compnay_name[i]}" , "${workdesignation[i]}" , "${from[i]}","${to[i]}")`;
      con.query(sql, function (err, result) {
        if (err) return res.render("../views/error.ejs");
      });
    }

    //reference
    let newrname = rn.filter(function (el) {
      return el != "";
    });

    if (newrname.length > 0) {
      for (let i = 0; i < newrname.length; i++) {
        sql = `delete from task12_reference where eid = ${hidden}`;
        // sql);
        con.query(sql, function (err, result) {
          if (err) return res.render("../views/error.ejs");
        });
      }

      for (let i = 0; i < newrname.length; i++) {
        sql = `insert into task12_reference (eid , name ,contact ,relation) values (${hidden} , "${rn[i]}" , ${rc[i]} , "${rr[i]}")`;
        con.query(sql, function (err, result) {
          if (err) return res.render("../views/error.ejs");
        });
      }
    }

    ///ptask12_references

    sql = `delete from task12_preference where eid = ${hidden}`;
    // sql);
    con.query(sql, function (err, result) {
      if (err) return res.render("../views/error.ejs");
    });

    for (let i = 0; i < preferdlocation.length; i++) {
      sql = `insert into task12_preference (eid,location,noticeperiod,expectedCTC,currentCTC,department) values (${hidden},"${preferdlocation[i]}", ${noticeperiod}, ${expectedctc}, ${currentctc} , "${department}")`;
      con.query(sql, function (err, result) {
        if (err) return res.render("../views/error.ejs");
      });
    }

    //task12_education
    sql = `delete from task12_education where eid = ${hidden}`;
    con.query(sql, function (err, result) {
      if (err) return res.render("../views/error.ejs");
    });

    let edu = course.filter(function (el) {
      return el != "";
    });

    for (let i = 0; i < edu.length; i++) {
      sql = `insert into task12_education (eid , coursename , passingyear , percentage) values (${hidden} , "${course[i]}" , ${year[i]} , ${percentage[i]})`;
      con.query(sql, function (err, result) {
        if (err) return res.render("../views/error.ejs");
      });
    }

    // language
    sql = `delete from task12_language where eid = ${hidden}`;
    con.query(sql, function (err, result) {
      if (err) return res.render("../views/error.ejs");
    });

    if (languages) {
      if (languages.includes("gujarati")) {
        if (!gujaratiradio.includes("read")) {
          gujaratiradio.splice(0, 0, "");
        }
        if (!gujaratiradio.includes("write")) {
          gujaratiradio.splice(1, 0, "");
        }
        if (!gujaratiradio.includes("speak")) {
          gujaratiradio.splice(2, 0, "");
        }
      }

      if (languages.includes("hindi")) {
        if (!hindiradio.includes("read")) {
          hindiradio.splice(0, 0, "");
        }
        if (!hindiradio.includes("write")) {
          hindiradio.splice(1, 0, "");
        }
        if (!hindiradio.includes("speak")) {
          hindiradio.splice(2, 0, "");
        }
      }

      if (languages.includes("english")) {
        if (!englishradio.includes("read")) {
          englishradio.splice(0, 0, "");
        }
        if (!englishradio.includes("write")) {
          englishradio.splice(1, 0, "");
        }
        if (!englishradio.includes("speak")) {
          englishradio.splice(2, 0, "");
        }
      }

      let newer, newgr, newhr;

      if (languages.includes("gujarati")) {
        newgr = gujaratiradio.filter(function (el) {
          return el != "";
        });
      }

      if (languages.includes("english")) {
        newer = englishradio.filter(function (el) {
          return el != "";
        });
      }

      if (languages.includes("hindi")) {
        newhr = hindiradio.filter(function (el) {
          return el != "";
        });
      }

      let templan = [];
      if (newhr !== undefined) {
        templan.push(newhr);
      }
      if (newer !== undefined) {
        templan.push(newer);
      }
      if (newgr !== undefined) {
        templan.push(newgr);
      }
      console.log(templan);

      for (let i = 0; i < languages.length; i++) {
        for (let j = 0; j < templan[i].length; j++) {
          sql = `insert into task12_language (eid , languagename , type) values (${hidden} , "${languages[i]}", "${templan[i][j]}")`;
          con.query(sql, function (err, result) {
            if (err) return res.render("../views/error.ejs");
          });
        }
      }
    }

    ////technology
    sql = `delete from task12_technology where eid = ${hidden}`;

    if (technologies) {
      let temptech = [];
      if (tech1 !== undefined) {
        temptech.push(tech1);
      }
      if (tech2 !== undefined) {
        temptech.push(tech2);
      }
      if (tech3 !== undefined) {
        temptech.push(tech3);
      }
      if (tech4 !== undefined) {
        temptech.push(tech4);
      }

      console.log(technologies);
      console.log(temptech);
      for (let i = 0; i < technologies.length; i++) {
        sql = `insert into task12_technology (eid ,  technology , type) values (${hidden} , "${technologies[i]}", "${temptech[i]}")`;
        con.query(sql, function (err, result) {
          if (err) return res.render("../views/error.ejs");
        });
      }
    }
  }

  res.render("./jobAppForm/validate");
};

const update = (req, res) => {
  const id = req.params.id;
  const sql = `select * from task12_basic_details where eid = ${id} ; select * from task12_education where eid = ${id} ; select * from task12_experience where eid = ${id} ; select * from task12_language where eid = ${id} ; select * from task12_technology where eid = ${id} ; select * from task12_reference where eid = ${id} ; select * from task12_preference where eid = ${id}`;
  con.query(sql, function (err, result) {
    if (err) return res.render("../views/error.ejs");
    const key = Object.keys(result[0]);

    res.render("./jobAppForm/index", { result, key });
  });
};

module.exports = {
  form,
  submitform,
  update,
  display,
  updated,
};
