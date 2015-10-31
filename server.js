var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var courses = require('./courses')

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/course', function (req, res) {
    var str = '(function(){angular.courses = ';
    str += JSON.stringify(courses);
    str += '})();';
    res.send(str);
});

//require("./public/experiments/express/require/get.hello.exp.js")(app);
//require("./public/experiments/require/experiments.js")(app);

require("./public/lectures/nodejs/expressjs/server.js")(app);
require("./public/experiments/express/filter/server/app.js")(app);
require("./public/experiments/express/movies/server/app.js")(app);

require("./public/lectures/movies/server/app.js")(app);

app.listen(port, ipaddress);
