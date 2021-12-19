const express = require('express');
const app = express();
const app1 = express();
const app2 = express();
const app3 = express();
const path = require('path');
const router = express.Router();
var mysql = require('mysql');
var alert = require('alert');
var bodyParser = require('body-parser');
app1.use(bodyParser.urlencoded({extended: false}));
app1.use(bodyParser.json());
app2.use(bodyParser.urlencoded({extended: false}));
app2.use(bodyParser.json());
app3.use(bodyParser.urlencoded({extended: false}));
app3.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_js_application"
});

// Define the static file path
app.use(express.static(__dirname+'/'));
app3.use(express.static(__dirname+"Ambulance"));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

//code for registration
app1.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/Regis.html'));
});

app1.post('/submit',function(req,res){
  var name=req.body.fname;
  var email=req.body.femail;
  var address=req.body.faddress;
  var contact=req.body.fcontact;
  var ward=req.body.fward;
  var complain=req.body.fcomplain;
  //write the data updating code here...
  var sql = "INSERT INTO complain (name, email, address, contact, ward_no, complain) VALUES ('"+name+"', '"+email+"','"+address+"', '"+contact+"','"+ward+"', '"+complain+"')";
  con.query(sql,function(err,result){
      if(err) throw err;
      console.log("Record inserted...");
      alert("Success");
      res.redirect('/');
  });
});

//code for death certificate registration
//  var sql = "INSERT INTO death (name, address, cause, phone, place, doctor) VALUES ('"+name+"', '"+address+"','"+cause+"', '"+phone+"', '"+place+"', '"+doctor+"')";
app2.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/death_certificate_register.html'));
});

app2.post('/submit',function(req,res){
    var name=req.body.fname;
    var address=req.body.faddress;
    var cause=req.body.fcause;
    var phone=req.body.fphone;
    var place=req.body.fplace;
    var doctor=req.body.fdoctor;
    var gender=req.body.fgender;
    //data insert code here...
    var sql1 = "INSERT INTO death (name, address, cause, phone, place, doctor) VALUES ('"+name+"', '"+address+"','"+cause+"', '"+phone+"', '"+place+"', '"+doctor+"')";
    con.query(sql1,function(err,result){
      if(err) throw err;
      console.log("Death details inserted...");
      alert("Death Certificate Application Submitted Successfully...");
      res.redirect('/');
    });
});


//for ambulance deployment module
app3.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/ambulance.html'));
});

app3.post('/submit',function(req,res){
    var name=req.body.name;
    var phone=req.body.phone;
    var address=req.body.address;
    //data insert code here...
    var sql1 = "INSERT INTO ambulance (name, phone, address) VALUES ('"+name+"', '"+phone+"','"+address+"')";
    con.query(sql1,function(err,result){
      if(err) throw err;
      console.log("Dispatching ambulance... ");
      alert("Medical emergency registered successfully... Ambulance on the way...");
      res.redirect('/');
    });
});

//for ambulance dispatchment
app3.use('/',router);
app3.listen(process.env.port || 3003);
console.log('Running on port 3003')

//for death registration
app2.use('/', router);
app2.listen(process.env.port || 3002);
console.log('Running at Port 3002');


//for complain registration
app1.use('/', router);
app1.listen(process.env.port || 3001);
console.log('Running at Port 3001');


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');