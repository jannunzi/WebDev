var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public_course'));

var courses = [
  {title: "Java", seats: 24, start: new Date()},
  {title: "Java", seats: 24, start: new Date()},
  {title: "Java", seats: 24, start: new Date()}
];

app.get("/rest/course", function(req, res)
{
  res.json(courses);
});

app.listen(3000);