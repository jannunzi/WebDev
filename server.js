var express = require('express');
var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(port, ipaddress);
