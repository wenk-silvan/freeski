const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 80
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

router.get('/', function(req,res){  
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

router.get('/image', function(req,res){  
  res.send("skiing1.jpg");
});

app.use(express.static(__dirname + '/app/public'));
app.use('/', router);
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});