var express = require('express');
var router = express.Router();
// var sql = require("mssql");
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var fs = require("fs");
var contents = fs.readFileSync("authentication.json");
var jsonContent = JSON.parse(contents);

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
    database: "attendance",
    encrypt: true
  }
};

/* GET users listing."7790996151" */
router.post('/foodVerify', function (req, res, next) {
  var new_data = {};
  var date = new Date();
  var current_hour = date.getHours();
  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  date = dd + '/' + mm + '/' + yyyy;
  console.log(date, current_hour);
  new_data['hour'] = current_hour;
  var connection = new Connection(config);
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });

  function queryDatabase() {
    var myObj = JSON.parse(req.body.data);
    var query = "select * from dbo.celebal_food_updates where date='" + date + "' AND employee_id=" + myObj.empId + " ";
    console.log(query);
    var request = new Request(query, function (err, rowCount, rows) {
      if(err)
      {
        console.log(err);
      }
      console.log(rowCount + ' row(s) returned');

      if(rowCount == 0){
        new_data['status']=false;
      }
      else{
        new_data['status']=true;
      }
      res.send(new_data);

    });
    request.on('row', function (columns) {
      columns.forEach(function (column) {

        var column_name;
        var column_value;
        column_name = column.metadata.colName;
        column_value = column.value;
        new_data[column_name] = column_value;
      });

    });
    connection.execSql(request);
  }
});

router.post('/foodUpdate', function (req, res, next) {
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  date = dd + '/' + mm + '/' + yyyy;
  var connection = new Connection(config);
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });
  function queryDatabase() {
    var myObj = JSON.parse(req.body.data);
    var query = "insert into dbo.celebal_food_updates ( employee_id,lunch_status,dinner,date ) values('" + myObj.empId + "','" + myObj.orderLunch + "','" + myObj.orderDinner + "','" + date + "')";
    console.log(query);
    var request = new Request(query, function (err, rowCount, rows) {
      console.log(rowCount + ' row(s) returned');
    });
     request.on("row", function (columns) {
              columns.forEach(function (column) {
                console.log("%s\t%s", column.metadata.colName, column.value);
              });
            });
    connection.execSql(request);
  }
  res.status(200).end();
});



 // if (rowCount == 0)
          // {
          //   console.log("+++++++++++++++++++++++++++++++++++")
          //

          //   var request1 = new Request(query, function (err, rowCount, rows) {
          //     console.log(rowCount);
          //     if (err) {
          //       console.log(err);
          //     }
          //   });

          //   connection.execSql(request1);

          // }
          // else
          // {

router.post('/foodHistory', function (req, res, next) {
  var food_data = [];
  var empId = req.body.data;
  // ___________________________________________________________________
  // var config = {
  //   authentication: {
  //     options: {
  //       userName: 'wfsdev', // update me
  //       password: 'Tata@123' // update me
  //     },
  //     type: 'default'
  //   },
  //   server: 'wfsdeve.database.windows.net', // update me
  //   options: {
  //     database: 'Accord_db', //update me
  //     encrypt: true
  //   }
  // }

  var data1 = req.body.data;
  console.log(data1);
  var connection = new Connection(config);

  // Attempt to connect and execute queries if connection goes through
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });

  function queryDatabase() {
    var pp;

    console.log('Reading rows from the Table...');

    // Read all rows from table request.query(, function (err, recordset)
    var request = new Request(
      "select * from dbo.celebal_food_updates where  employee_id=" + empId + " ORDER BY id DESC",
      function (err, rowCount, rows) {
        if(err){
          console.log(err);
        }
        pp = rowCount;
        console.log(pp);
        console.log(rows);
        //console.log()
        console.log(rowCount + ' row(s) returned');
        if (rowCount == 0)
          res.send(false);
        else
          res.send(food_data);
      }

    );

    console.log(request);

    request.on('row', function (columns) {
      var new_data = {};
      // dataget{'column.metadata.colName'}=column.value;
      // res.send(columns);
      columns.forEach(function (column) {
        console.log("%s\t%s", column.metadata.colName, column.value);
        // dataget.push({[column.metadata.colName]: column.value});
        var column_name;
        var column_value;
        column_name = column.metadata.colName;
        column_value = column.value;
        new_data[column_name] = column_value;

      });

      food_data.push(new_data);

    });


    connection.execSql(request);


  }




  // ______________________________________________________________________


})


router.get('/foodData', function (req, res, next) {
  var food_data = [];
  var empId = req.body.data;
  // ___________________________________________________________________
  // var config = {
  //   authentication: {
  //     options: {
  //       userName: 'wfsdev', // update me
  //       password: 'Tata@123' // update me
  //     },
  //     type: 'default'
  //   },
  //   server: 'wfsdeve.database.windows.net', // update me
  //   options: {
  //     database: 'Accord_db', //update me
  //     encrypt: true
  //   }
  // }

  var data1 = req.body.data;
  console.log(data1);
  var connection = new Connection(config);
  // Attempt to connect and execute queries if connection goes through
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });

  function queryDatabase() {
    var pp;

    console.log('Reading rows from the Table...');

    // Read all rows from table reque  ORDER BY Country DESCst.query(, function (err, recordset)
    var request = new Request(
      "select * from dbo.celebal_food_updates ORDER BY id DESC",
      function (err, rowCount, rows) {
        if(err){
          console.log(err)
        }
        pp = rowCount;
        console.log(pp);
        console.log(rows);
        //console.log()
        console.log(rowCount + ' row(s) returned');
        if (rowCount == 0)
          res.send(false);
        else
          res.send(food_data);

      }

    );
    console.log(request);
    request.on('row', function (columns) {
      var new_data = {};
      // dataget{'column.metadata.colName'}=column.value;
      // res.send(columns);
      columns.forEach(function (column) {
        console.log("%s\t%s", column.metadata.colName, column.value);
        // dataget.push({[column.metadata.colName]: column.value});
        var column_name;
        var column_value;
        column_name = column.metadata.colName;
        column_value = column.value;
        new_data[column_name] = column_value;

      });

      food_data.push(new_data);

    });


    connection.execSql(request);


  }




  // ______________________________________________________________________


})


router.post('/verify', function (req, res, next) {
  // res.send('respond with a resource');

  new_data = {};
  var dataget = [];
  // res.send('8003229853');
  // console.log("ellllh1");

  // Create connection to database
  // var config = {
  //   authentication: {
  //     options: {
  //       userName: 'wfsdev', // update me
  //       password: 'Tata@123' // update me
  //     },
  //     type: 'default'
  //   },
  //   server: 'wfsdeve.database.windows.net', // update me
  //   options: {
  //     database: 'Accord_db', //update me
  //     encrypt: true
  //   }
  // }

  var data1 = req.body.data;
  console.log(data1,config);

  var connection = new Connection(config);

  // Attempt to connect and execute queries if connection goes through
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });

  function queryDatabase() {
    var pp;

    console.log('Reading rows from the Table...');

    // Read all rows from table request.query(, function (err, recordset)
    var request = new Request(
      "select * from Celebal.Employee where ContactNumber=" + data1 + "",
      function (err, rowCount, rows) {
        pp = rowCount;
        console.log(pp);
        console.log(rows);
        //console.log()
        console.log(rowCount + ' row(s) returned');
        if (rowCount == 0)
          res.send(false);
        else
          res.send(new_data);

      }

    );

    console.log(request);
    request.on('row', function (columns) {

      // dataget{'column.metadata.colName'}=column.value;
      // res.send(columns);
      columns.forEach(function (column) {
        console.log("%s\t%s", column.metadata.colName, column.value);
        // dataget.push({[column.metadata.colName]: column.value});
        var column_name;
        var column_value;
        column_name = column.metadata.colName;
        column_value = column.value;
        new_data[column_name] = column_value;
      });



    });
    connection.execSql(request);


  }




});



router.get('/', function (req, res, next) {

  const order = JSON.parse(req.body.data);
  console.log(order);
  res.send('respond with a resource');


});

module.exports = router;
