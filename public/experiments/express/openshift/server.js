var express = require('express');
var app = express();

app.get('/hello', function(req, res){
    res.send('Hello World from server.js!');
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
