var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
// install and require the mongoose library
var mongoose      = require('mongoose');

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.set('view engine', 'ejs');


console.log("secret");
console.log(process.env.PASSPORT_SECRET);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: process.env.PASSPORT_SECRET }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

require("./app.js")(app, db, mongoose, passport, LocalStrategy);

app.post("/api/experiments/passport/exp2/login", passport.authenticate('local'), function(req, res)
{
    var user = req.user;
    res.json(user);
});

app.get('/api/experiments/passport/exp2/loggedin', function(req, res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/api/experiments/passport/exp2/logout', function(req, res)
{
    req.logOut();
    res.send(200);
});

app.post('/api/experiments/passport/exp2/register', function(req, res)
{
    var newUser = req.body;
    newUser.roles = ['student'];
    UserModel.findOne({username: newUser.username}, function(err, user)
    {
        if(err) { return next(err); }
        if(user)
        {
            res.json(null);
            return;
        }
        var newUser = new UserModel(req.body);
        newUser.save(function(err, user)
        {
            req.login(user, function(err)
            {
                if(err) { return next(err); }
                res.json(user);
            });
        });
    });
});

var auth = function(req, res, next)
{
    if (!req.isAuthenticated())
    {
        res.send(401);
    }
    else
    {
        next();
    }
};

app.get("/api/experiments/passport/exp2/user", auth, function(req, res)
{
    UserModel.find(function(err, users)
    {
        res.json(users);
    });
});

app.delete("/api/experiments/passport/exp2/user/:id", auth, function(req, res)
{
    UserModel.findById(req.params.id, function(err, user)
    {
        user.remove(function(err, count)
        {
            UserModel.find(function(err, users)
            {
                res.json(users);
            });
        });
    });
});

app.put("/api/experiments/passport/exp2/user/:id", auth, function(req, res)
{
    UserModel.findById(req.params.id, function(err, user)
    {
        user.update(req.body, function(err, count)
        {
            UserModel.find(function(err, users)
            {
                res.json(users);
            });
        });
    });
});

app.post("/api/experiments/passport/exp2/user", auth, function(req, res)
{
    UserModel.findOne({username: req.body.username}, function(err, user)
    {
        if(user == null)
        {
            user = new UserModel(req.body);
            user.save(function(err, user)
            {
                UserModel.find(function(err, users)
                {
                    res.json(users);
                });
            });
        }
        else
        {
            UserModel.find(function(err, users)
            {
                res.json(users);
            });
        }
    });
});

app.get('/hello', function(req, res) {
    res.render('hello.ejs');
});

app.get('/tools/experiment', function(req, res) {
    res.render('tools/experimentView.ejs', {req: req});
});

app.get('/lecture/ejs/hello', function(req, res){
    res.render('lecture/hello.ejs');
})

var faculty = [
    {username: "edward"},
    {username: "frank"},
    {username: "greg"},
    {username: "herbert"}
];

var data = {
    faculty: faculty
};

app.get('/lecture/ejs/intro', function(req, res){

    res.render('lecture/intro.ejs', data);
});

app.post("/lecture/ejs/form", function(req, res){
    var course = req.body;
    console.log(course);
    res.render("lecture/intro.ejs", data);
});

require("./lectures/ejs/mongo/app.js")(app, mongoose);

//require("./public/experiments/express/require/get.hello.exp.js")(app);
//require("./public/experiments/require/experiments.js")(app);

//require("./public/lectures/nodejs/expressjs/server.js")(app);
require("./public/experiments/express/server.js")(app);
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

require("./public/experiments/mongodb/ss/server/app.js")(app, db, mongoose);
//require("./public/ds/pe/server/app.js")(app, db, mongoose);

require("./public/ds/ss/server/app.js")(app, db, mongoose);
require("./public/ds/fc/server/app.js")(app, db, mongoose);
require("./public/ds/ce/server/app.js")(app, db, mongoose);
require("./public/ds/pe/server/app.js")(app, db, mongoose);

//require("./public/experiments/passport/exp1/server/app.js")(app, db, mongoose, passport);
//require("./public/experiments/passport/exp2/server/app.js")(app, db, mongoose, passport);

require("./public/experiments/ejs/app.js")(app);
require("./public/experiments/ejs/courses/app.js")(app, mongoose);
require("./experiments/ejs/directory/app.js")(app);
require("./experiments/ejs/explorer/app.js")(app, mongoose, __dirname);
require("./views/experiments/ejs/wam/app.js")(app, mongoose);

require("./public/experiments/braintree/server/app.js")(app);
require("./public/directives/getServerFile/server/app.js")(app);

require("./public/experiments/server/express/omdb/get/server/app.js")(app);
require("./public/experiments/server/express/omdb/post/server/app.js")(app);
require("./public/experiments/server/express/omdb/delete/server/app.js")(app);
require("./public/experiments/server/express/omdb/update/server/app.js")(app);
require("./public/experiments/server/express/omdb/structure/server/app.js")(app);

require("./public/project/omdb/server/app.js")(app);

app.listen(port, ipaddress);
