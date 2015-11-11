var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var mongoose = require('mongoose');
mongoose.connect(connectionString);
var db = mongoose.connection;

//var courses = require('./courses')

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('api/course', function (req, res) {
    var str = '(function(){angular.courses = ';
    str += JSON.stringify(courses);
    str += '})();';
    res.send(str);
});

//require("./public/experiments/express/require/get.hello.exp.js")(app);
//require("./public/experiments/require/experiments.js")(app);

//require("./public/lectures/nodejs/expressjs/server.js")(app);
//
//require("./public/lectures/nodejs/angularjsClient/server.js")(app);
//require("./public/experiments/rest/app/model/application.model.test.js");
//require("./public/experiments/rest/app/model/page.model.test.js");
//require("./public/experiments/rest/app/server")(app);
//
////require("./public/lectures/angularjs/jsonp/server/MovieService.js")(app);
//
//require("./public/experiments/express/filter/server/app.js")(app);
//require("./public/experiments/express/movies/server/app.js")(app);
//
//require("./public/lectures/movies/server/app.js")(app);

//require("./public/ds/fc/server/app.js")(app, db, mongoose);

require("./public/lectures/mongo/pageEditor/server/app.js")(app, mongoose, db);
require("./public/portal/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);
