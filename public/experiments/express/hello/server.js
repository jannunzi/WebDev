var express = require('express');
var app = express();

app.get('/hello', function(req, res){
    res.send('Hello World from server.js!');
});

app.listen(3000);
