var express = require('express');
var router = express.Router();
var ADODB = require('node-adodb');
// ADODB.debug = true;
// var sql = require("mssql");'
var async=require('async');
var fs = require("fs");
const Sequelize = require('sequelize');
var Connection = require('tedious').Connection;
TYPES = require('tedious').TYPES;
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




router.post('/upd', function (req, res, next) {


  console.log("hello");
  // C
  var connect = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C://Users//rahul//OneDrive//Documents//adobe.accdb;');


  console.log("hello");

  connect
    .query('SELECT * FROM hell')
    .then(data => {
      console.log("kyu");
      console.log(JSON.stringify(data, null, 2));
      res.status(200).end();
    })
    .catch(error => {
      console.error(error, "bhag");
    });




});

/* GET users listing."7790996151" */
router.post('/', function (req, res, next) {
  var data = [];
  var myObj = JSON.parse(req.body.data);
  console.log(myObj);
  var today = new Date(myObj['todayDate']);
  var year = today.getFullYear();
  var mon = today.getMonth() + 1;
  var connection = new Connection(config);
  var new_data = {};

  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });

  function queryDatabase() {
    var pp;
    var query = "select *,cast([adate] As varchar(12))  As adate from celebal.attendance where employeeID='" + myObj.empID + "'and datepart(year, adate) = '" + year + "' and datepart(month, adate) = '" + mon + "'order by day(adate) desc";

    console.log(query);
    var request = new Request(query, function (err, rowCount, rows) {
        pp = rowCount;
        console.log(rowCount + ' row(s) returned');

        res.send(data);
      }

    );
    request.on('row', function (columns) {
        columns.forEach(function (column) {
          var column_name;
          var column_value;
          column_name = column.metadata.colName;
          column_value = column.value;
          new_data[column_name] = column_value;
        });

        data.push(new_data);
        new_data = {};
      }

    );
    connection.execSql(request);


  }

});

router.post('/all', function (req, res, next) {
  var data = [];
  var myObj = JSON.parse(req.body.data);
  console.log(myObj);
  var today = new Date(myObj['todayDate']);
  var year = today.getFullYear();
  var mon = today.getMonth() + 1;
  var connection = new Connection(config);
  var new_data = {};
  console.log(year, mon);
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });

  function queryDatabase() {
    var pp;
    var query = "select *,cast([adate] As varchar(12))  As adate from celebal.attendance where datepart(year, adate) = '" + year + "' and datepart(month, adate) = '" + mon + "' order by day(adate) desc";


    var request = new Request(query, function (err, rowCount, rows) {
        pp = rowCount;
        console.log(query);
        console.log(data, "hsad");
        res.send(data);
      }

    );
    request.on('row', function (columns) {
      columns.forEach(function (column) {
        var column_name;

        var column_value;
        column_name = column.metadata.colName;
        column_value = column.value;
        new_data[column_name] = column_value;
      });

      data.push(new_data);
      new_data = {};

    });
    connection.execSql(request);


  }

});

router.post('/update', function (req, res, next) {
  var data = [];
  var myObj = JSON.parse(req.body.data);
  console.log("hello");
  console.log(myObj);
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate());

  var connection = new Connection(config);
  var new_data = {};
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });

  function queryDatabase() {

    var myObj = JSON.parse(req.body.data);
    var query = "insert into celebal.update_att values('" + myObj.emp_id + "','" + date + "','" + myObj.DTU + "','" + myObj.entryTime + "','" + myObj.exitTime + "','" + myObj.task_description + "','" + myObj.isapproved + "')";
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
    res.status(200).end();

  }

});


router.post('/approveUpdateReport', function (req, res, next) {
  var data = [];
  var myObj = JSON.parse(req.body.data);
  console.log("hello ji soni");
  console.log(myObj);
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate());

  var connection = new Connection(config);
  var connection2 = new Connection(config);
  var new_data = {};
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
    queryDatabase();
    }
  });



  var queryDatabase=function () {

    var myObj = JSON.parse(req.body.data);
    var query = "update celebal.update_att set isapproved='"+myObj.isapproved+"' WHERE sNo ='"+myObj.sNO+"';update celebal.attendance set entryTime='"+myObj.entryTime+"', exitTime='"+myObj.exitTime+"', status='P' WHERE employeeID ='"+myObj.employeeID+"' and  adate='"+myObj.DTU+"'";
    console.log(query);
    var request = new Request(query, function (err, rowCount, rows) {
      console.log(rowCount + ' row(s) returned');
      res.status(200).end();
    });
    request.on("row", function (columns) {
      columns.forEach(function (column) {
        console.log("%s\t%s", column.metadata.colName, column.value);
      });
    });
    connection.execSql(request);


  }


});




router.post('/leaveMang', function (req, res, next) {
  var data = [];
  var myObj = JSON.parse(req.body.data);
  console.log(myObj);
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate());



  var connection = new Connection(config);
  var new_data = {};
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });

  function queryDatabase() {
    var myObj = JSON.parse(req.body.data);
    // create table celebal.(
    // EmployeeID varchar(255),
    // DOLA date,
    // DOLF date,
    // DOLT date,
    // status varchar(20),
    // reason varchar(1000),
    // isApproved varchar(20)
    // );
    var query = "insert into celebal.leaveMang values('" + myObj.emp_id + "','" + date + "','" + myObj.DOLF + "','" + myObj.DOLT + "','" + myObj.status + "','" + myObj.reason + "','N','')";
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
    res.status(200).end();
  }
});



router.get('/leaveData', function (req, res, next) {
  var data = [];
  //  var myObj = JSON.parse(req.body.data);
  //  console.log(myObj);
  //  var today=new Date(myObj['todayDate']);
  //  var year=today.getFullYear();
  //  var mon=today.getMonth()+1;
  var connection = new Connection(config);
  var new_data = {};
  console.log("chomr");
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });
  //  ,cast([DOLA,DOLF,DOLT] As varchar(12))
  function queryDatabase() {
    var pp;
    var query = "select *,cast([DOLA] As varchar(12)) as DOLA,cast([DOLF] As varchar(12)) as DOLF,cast([DOLT] As varchar(12)) as DOLT from celebal.leaveMang where isApproved='N' order by day(DOLA) desc";


    var request = new Request(query, function (err, rowCount, rows) {
      if(err){
        console.log(err);
      }
      pp = rowCount;
        console.log(query);
        console.log(data, "hsad");
        // if(rowCount!=0)
        res.send(data);
        // else
        // res.send('no data found');
      }

    );
    request.on('row', function (columns) {
      columns.forEach(function (column) {
        var column_name;

        var column_value;
        column_name = column.metadata.colName;
        column_value = column.value;
        new_data[column_name] = column_value;
      });

      data.push(new_data);
      new_data = {};

    });
    connection.execSql(request);


  }

});

router.post('/approveLeave', function (req, res, next) {
  var myObj = JSON.parse(req.body.data);
  console.log(myObj);
     var connection = new Connection(config);
   connection.on('connect', function (err) {
     if (err) {
       console.log(err)
     } else {
      if (myObj['isApproved'] == 'Y') {
        console.log("hudddddddddddtiya");
        appr();
        setappr();
      }
      else if(myObj['isApproved'] == 'REJ')
      {
        reject();
      }
      }
   });


  function appr(){
    const sequelize = new Sequelize('attendance', 'yash', 'Myageis@20', {
      host: 'yashtesting.database.windows.net',
      dialect: 'mssql',
      dialectOptions: {
        options: {
          useUTC: false,
          dateFirst: 1,
          encrypt: true
        }
      }
    });
    var User = sequelize.define("attendance", {
      employeeID: Sequelize.STRING,
      adate: Sequelize.DATE,
      entryTime: Sequelize.STRING,
      exitTime: Sequelize.STRING,
      status: Sequelize.STRING
    }, {
      schema: 'celebal',
      timestamps: false,
      freezeTableName: true,
      tableName: 'attendance'
    });
    var dF = new Date(myObj['DOLF']);
    dF.setDate(dF.getDate() + 1);
    var dT = new Date(myObj['DOLT']);
    dT.setDate(dT.getDate() + 1);
    console.log(dF, dT)
    var dK = [];
    var i = 0;

    do {
      dK[i++] =
        dF.getFullYear() +
        "-" +
        (dF.getMonth() + 1) +
        "-" +
        (dF.getDate());
      console.log(dF);
      if (dF.getTime() == dT.getTime()) {
        console.log("hello");
        break;
      } else {
        dF.setDate(dF.getDate() + 1);
      }
    } while (true);
    console.log(dK);
    for (let j = 0; j < i; j++) {
      console.log("dgfsadgfgdsmjfds");
      // dK[j].setDate(dK[j].getDate() + 1);
      sequelize.sync().then(function () {
        return User.create({
          employeeID: myObj.EmployeeID,
          adate: new Date(dK[j]),
          entryTime: '00:00',
          exitTime: '00:00',
          status: myObj.status
        });
      }).then(function (jane) {
        console.log(jane.get({
          plain: true
        }));
      });
    }


  }
  function reject(){
       var query="update celebal.leaveMang set isApproved='REJ',comments='"+myObj.comment+"' WHERE sNo ='"+myObj.sNO+"'";
    console.log(query);
    var request = new Request(query, function (err, rowCount, rows) {
      if(err)
      console.log(err);
      console.log(rowCount + ' row(s) returned');
    });
     request.on("row", function (columns) {
              columns.forEach(function (column) {
                console.log("%s\t%s", column.metadata.colName, column.value);
              });
            });
    connection.execSql(request);
  }
  function setappr(){
    var query="update celebal.leaveMang set isApproved='Y',comments='"+myObj.comment+"' WHERE sNo ='"+myObj.sNO+"'";
    console.log(query);
    var request = new Request(query, function (err, rowCount, rows) {
      if(err)
      console.log(err);
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


router.post('/leaveHistoryEmployee', function (req, res, next) {
  var data = [];
   console.log(req.body.data);
  //  var today=new Date(myObj['todayDate']);
  //  var year=today.getFullYear();
  //  var mon=today.getMonth()+1;
  var connection = new Connection(config);
  var new_data = {};
  console.log("chomr");
  connection.on('connect', function (err) {
    if (err) {
      console.log(err)
    } else {
      queryDatabase()
    }
  });
  //  ,cast([DOLA,DOLF,DOLT] As varchar(12))
  function queryDatabase() {
    var pp;
    var query = "select *,cast([DOLA] As varchar(12)) as DOLA,cast([DOLF] As varchar(12)) as DOLF,cast([DOLT] As varchar(12)) as DOLT from celebal.leaveMang where isApproved != 'N' and EmployeeID='"+req.body.data+"' order by day(DOLA) desc";


    var request = new Request(query, function (err, rowCount, rows) {
      if(err){
        console.log(err);
      }
      pp = rowCount;
        console.log(query);
        console.log(data, "hsad");
        // if(rowCount!=0)
        res.send(data);
        // else
        // res.send('no data found');
      }

    );
    request.on('row', function (columns) {
      columns.forEach(function (column) {
        var column_name;

        var column_value;
        column_name = column.metadata.colName;
        column_value = column.value;
        new_data[column_name] = column_value;
      });

      data.push(new_data);
      new_data = {};

    });
    connection.execSql(request);


  }

});

router.post('/leaveHistoryAdmin', function (req, res, next) {
  var data = [];
  console.log(req.body.data);
 //  var today=new Date(myObj['todayDate']);
 //  var year=today.getFullYear();
 //  var mon=today.getMonth()+1;
 var connection = new Connection(config);
 var new_data = {};
 console.log("chomr");
 connection.on('connect', function (err) {
   if (err) {
     console.log(err)
   } else {
     queryDatabase()
   }
 });
 //  ,cast([DOLA,DOLF,DOLT] As varchar(12))
 function queryDatabase() {
   var pp;
   var query = "select *,cast([DOLA] As varchar(12)) as DOLA,cast([DOLF] As varchar(12)) as DOLF,cast([DOLT] As varchar(12)) as DOLT from celebal.leaveMang where isApproved != 'N' order by day(DOLA) desc";


   var request = new Request(query, function (err, rowCount, rows) {
     if(err){
       console.log(err);
     }
     pp = rowCount;
       console.log(query);
       console.log(data, "hsad");
       // if(rowCount!=0)
       res.send(data);
       // else
       // res.send('no data found');
     }

   );
   request.on('row', function (columns) {
     columns.forEach(function (column) {
       var column_name;

       var column_value;
       column_name = column.metadata.colName;
       column_value = column.value;
       new_data[column_name] = column_value;
     });

     data.push(new_data);
     new_data = {};

   });
   connection.execSql(request);


 }

});

router.get('/updateAttendance', function (req, res, next) {
  var data = [];
 //  var today=new Date(myObj['todayDate']);
 //  var year=today.getFullYear();
 //  var mon=today.getMonth()+1;
 var connection = new Connection(config);
 var new_data = {};
 console.log("chomr");
 connection.on('connect', function (err) {
   if (err) {
     console.log(err)
   } else {
     queryDatabase()
   }
 });
 //  ,cast([DOLA,DOLF,DOLT] As varchar(12))
 function queryDatabase() {
   var pp;
   var query = "select *,cast([DOU] As varchar(12)) as DOU,cast([DTU] As varchar(12)) as DTU from celebal.update_att where isapproved='N' order by day(DOU) desc";
  //  var query = "select *,cast([adate] As varchar(12))  As adate from celebal.attendance where employeeID='" + myObj.empID + "'and datepart(year, adate) = '" + year + "' and datepart(month, adate) = '" + mon + "'order by day(adate) desc";


   var request = new Request(query, function (err, rowCount, rows) {
     if(err){
       console.log(err);
     }
     pp = rowCount;
       console.log(query);
       console.log(data, "hsad");
       // if(rowCount!=0)
       res.send(data);
       // else
       // res.send('no data found');
     }

   );
   request.on('row', function (columns) {
     columns.forEach(function (column) {
       var column_name;

       var column_value;
       column_name = column.metadata.colName;
       column_value = column.value;
       new_data[column_name] = column_value;
     });

     data.push(new_data);
     new_data = {};

   });
   connection.execSql(request);


 }

});


module.exports = router;


// router.post('/approveLeav', function (req, res, next) {
//   var data=[];
//    var myObj = JSON.parse(req.body.data);
//    console.log(myObj);
//   //  pp();
//   //  var today=new Date();
//   //  var year=today.getFullYear();
//   //  var mon=today.getMonth()+1;
//    var connection = new Connection(config);
//   //  var new_data={};

//    connection.on('connect', function (err) {
//      if (err) {
//        console.log(err)
//      } else {
//       if(myObj['isApproved']=='Y'){
//         console.log("hudddddddddddtiya");
//    pp();

//       }

//       //  queryDatabase()
//      }
//    });

// //    function updateAttendance(){

// //     var dF=new Date(myObj['DOLF']);
// //    var dT=new Date(myObj['DOLT']);
// //    console.log(dF,dT)
// //   do{
// //     var dK=
// //     dF.getFullYear() +
// //     "-" +
// //     (dF.getMonth() + 1) +
// //     "-" +
// //     (dF.getDate());
// //     console.log(dK);
// //     var query="insert into celebal.attendance values('" + myObj.EmployeeID + "','" + dK + "','00:00','00:00','LEA')";


// //     console.log(query);
// //     var request = new Request(query, function (err, rowCount, rows) {
// //       console.log(rowCount + ' row(s) returned');
// //     });
// //      request.on("row", function (columns) {
// //               columns.forEach(function (column) {
// //                 console.log("%s\t%s", column.metadata.colName, column.value);
// //               });
// //             });
// //     connection.execSql(request);
// //     // connection.reset();

// // console.log(dF);
// //     if(dF.getTime()==dT.getTime())
// //     {
// //       console.log("hello");
// //       break;
// //     }

// //     else
// //     {
// // dF.setDate(dF.getDate()+1);
// //     }

// //   }while(true);

// //


// //    }

// function pp(){
//   const table = '[celebal].[attendance]';
//   console.log("by __________________________________");
//   var option = { keepNulls: true }; // option to honor null
//   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
//   var bulkLoad = connection.newBulkLoad(table, option, function(err, rowCont) {
//     if (err) {
//       console.log(err) ;
//     }
//     console.log("fghjklsdnfwf");
//     console.log('rows inserted :', rowCont);
//     connection.close();
//   });
//   console.log('hhhhhhhhhhhhhhhhhhh');
//   // bulkLoad.addColumn('c2', TYPES.Int, { length: 50, nullable: true });
//   bulkLoad.addRow({employeeID:'prarbdh.ranjan@celebaltech.com',
//   adate:'2019-10-21',
//   entryTime:'00:00',
//   exitTime:'00:00',
//   status:'LEA'
//  });

//   connection.execBulkLoad(bulkLoad);
//   res.status(200).end();


// }

//   //  function queryDatabase() {
//   //    var pp;
//   //   var query= "select *,cast([adate] As varchar(12))  As adate from celebal.attendance where employeeID='" + myObj.empID + "'and datepart(year, adate) = '" + year + "' and datepart(month, adate) = '" + mon + "' ";

//   //    console.log(query);
//   //    var request = new Request(query,function (err, rowCount, rows) {
//   //        pp = rowCount;
//   //        console.log(rowCount + ' row(s) returned');

//   //          res.send(data);
//   //      }

//   //    );
//   //    request.on('row', function (columns) {
//   //      columns.forEach(function (column) {
//   //        var column_name;
//   //        var column_value;
//   //        column_name = column.metadata.colName;
//   //        column_value = column.value;
//   //        new_data[column_name] = column_value;
//   //      });

//   //      data.push(new_data);
//   //  new_data={};
//   //    }

//   //    );
//   //    connection.execSql(request);


//   //  }

//  });
