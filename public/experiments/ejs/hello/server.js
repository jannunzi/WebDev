// load express
var express = require('express');
var app = express();

// set EJS as the rendering engine
app.set('view engine', 'ejs');

// route '/hello' HTTP request
// to render content in template
// 'hello.ejs' in 'views' directory
// '.ejs' extension is optional
app.get('/hello', function(req, res) {
    res.render('hello');
});

// listen for incoming HTTP
// requests at port 8080
app.listen(8080);
