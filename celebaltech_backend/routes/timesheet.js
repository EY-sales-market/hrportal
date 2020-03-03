var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/checkLogin', function(req, res, next) {

//   let ContactNumber = '';
//   let sql = 'SELECT  [EmployeeID] ,[DOJ],[OfficialEmailID],[Name],[DOB],[AadharNo],[PanNo],[CurrentAddress],[PermanentAddress],[ContactNumber] ,[EmployeeType] FROM [celebal].[Employee] WHERE [ContactNumber] = "'+ContactNumber+'"';
//   // res.render('index', { title: 'Express' });


});

module.exports = router;