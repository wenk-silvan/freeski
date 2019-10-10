const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function(req,res){  
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

router.get('/image', function(req,res){  
  res.send("skiing1.jpg");
});

app.use(express.static(__dirname + '/app/public'));
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');