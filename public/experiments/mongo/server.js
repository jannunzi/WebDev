var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/cs5610");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname + '/public'));

var courseSchema = new mongoose.Schema({
  title: String,
  seats: {type: Number, default: 25},
  start: {type: Date, default: Date.now}
}, {collection: "course"}
);

var Course = mongoose.model("Course", courseSchema);

app.get("/rest/course", function(req, res){
  Course.find(function(err, courses){
    res.json(courses);
  });
});

app.get("/rest/course/:id", function(req, res){
  Course.findById(req.params.id, function(err, course){
    res.json(course);
  });
});

app.delete("/rest/course/:id", function(req, res){
  console.log("delete");
  console.log(req.params.id);
  Course.remove({_id: req.params.id}, function(err, result){
    Course.find(function(err, courses){
      res.json(courses);
    });
  });
});

app.listen(3000);
