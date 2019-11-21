#!/usr/bin/env node

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

var server_port = 80;

router.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

router.get('/image', function(req,res){
  res.send("skiing1.jpg");
});

app.use(express.static(__dirname + '/app/public'));
app.use('/', router);

app.listen(server_port, function () {
  console.log("Listening on port " + server_port);
});