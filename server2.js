var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'sangeetha.cgcpmi6mcuyv.us-east-2.rds.amazonaws.com', //mysql database host name
  user     : 'sangeetha', //mysql database user name
  password : '12345678', //mysql database password
  database : 'sangeetha', //mysql database name
  port     : '3306'  
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3009,   function () {

   var host = 'ec2-18-221-18-69.us-east-2.compute.amazonaws.com'
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

//rest api to get all customers
app.get('/customer', function (req, res) {
   connection.query('select * from karnataka', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
app.get('/user', function (req, res) {
   connection.query('select * from user', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


app.post('/insert', function (req, res) {
	//get data
    var data = {
        name:req.body.name,
        mobileno:req.body.mobileno,
        emailid:req.body.emailid,
		dob:req.body.dob
     };
   connection.query("INSERT INTO user set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });
});
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.post('/insertquery', function (req, res) {
	//get data
	
     var origins = req.body.origins;
	 console.log(req.body);
	  var patt1 = /[0-9]/g;
	 var result = origins.match(patt1);
	 if(result){
		var origins1= req.body.origins;
		console.log(origins1);
		 //var origins1=req.body.origins;
		// var array = string.split(",").map(Number);
		connection.query("select pincode ,location from karnataka where pincode  like   ? ",   origins1 + '%',function (error, results,fields){
	   if (error) throw error;
	  res.end(JSON.stringify(results));
  
  })
	}	 
	 else if(origins.search(/[^a-zA-Z]+/) === -1) {
		 var origins2=req.body.origins;
 connection.query("select location,pincode from karnataka where location  like   ? ", origins2+'%' ,function (error, results,fields){
	   if (error) throw error;
	  res.end(JSON.stringify(results));
  
  })
}
	 
	
	
});
app.post('/pincodeinsert',function(req,res){
	var a=req.body.a;
	console.log(a);
});