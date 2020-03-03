const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var fs = require("fs");
app.use(bodyParser.json());
//reading the authentication file to get the username and password
var contents = fs.readFileSync("authentication.json");
var jsonContent = JSON.parse(contents);

// Create connection to database

var config = {
  authentication: {
    options: {
      userName: jsonContent.userName, // update me
      password: jsonContent.password // update me
    },
    type: "default"
  },
  server: jsonContent.server, // update me
  options: {
    database: jsonContent.database,
    encrypt: true
  }
};


 router.get("/approve_timesheets", (req, res, next) => {
   var new_data = {};
   var dataget = [];

   var connection = new Connection(config);

   connection.on("connect", function(err) {
     if (err) {
       console.log(err);
     } else {
       queryDatabase();
       console.log("database connected");
     }
   });
   function queryDatabase() {
    //  var query1 =

    //    "SELECT * FROM TIMESHEETS ";
       var query1 =
       "select a.projectname , b.*,cast([bill_date] As varchar(12)) As bill_date from projects a right join timesheets b on a.projectid = b.projectid ;";

     var request = new Request(query1, function(
       err,
       recordset,
       rowCount,
       rows
     ) {
       if(err){
         console.log(err);
       }
       res.send(dataget);
     });

     request.on("row", function(columns) {
       columns.forEach(function(column) {
         var column_name = column.metadata.colName;
         var column_data = column.value;

         new_data[column_name] = column_data;
       });

       dataget.push(new_data);
       new_data = {};
     });

     connection.execSql(request);
   }
 });


router.get("/view_timesheets", (req, res, next) => {
  var new_data = {};
  var dataget = [];

  var connection = new Connection(config);

  connection.on("connect", function(err) {
    if (err) {
      console.log(err);
    } else {
      queryDatabase();
      console.log("database connected");
    }
  });
  function queryDatabase() {
    var query1 =
    "select a.projectname , b.*,cast([bill_date] As varchar(12))  As bill_date from projects as a join timesheets as b on a.projectid = b.projectid ;";
    var query2 =
      "SELECT *,cast([bill_date] As varchar(12))  As bill_date FROM TIMESHEETS";

    var request = new Request(query1, function(err, recordset, rowCount, rows) {
      if(err){
        console.log(err)
      }
      res.send(dataget);
    });

    request.on("row", function(columns) {
      columns.forEach(function(column) {
        var column_name = column.metadata.colName;
        var column_data = column.value;

        new_data[column_name] = column_data;
      });

      dataget.push(new_data);
      new_data = {};
    });

    connection.execSql(request);
  }
});





module.exports = router; //the router with routes is exported and can be used in other files

