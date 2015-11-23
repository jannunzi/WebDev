var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

var UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String]
    }, {collection: "portal.user"});

var UserModel = mongoose.model('UserModel', UserSchema);

passport.use(new LocalStrategy(
    function(username, password, done)
    {
        UserModel.findOne({username: username, password: password}, function(err, user)
        {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        })
    }));

passport.serializeUser(function(user, done)
{
    done(null, user);
});

passport.deserializeUser(function(user, done)
{
    UserModel.findById(user._id, function(err, user)
    {
        done(err, user);
    });
});

app.get('api/course', function (req, res) {
    var str = '(function(){angular.courses = ';
    str += JSON.stringify(courses);
    str += '})();';
    res.send(str);
});

app.post("/api/portal/login", passport.authenticate('local'), function(req, res)
{
    var user = req.user;
    res.json(user);
});

app.get('/api/portal/loggedin', function(req, res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/api/portal/logout', function(req, res)
{
    req.logOut();
    res.send(200);
});

app.post('/api/portal/register', function(req, res)
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

app.get("/api/portal/user", function(req, res){
    UserModel
        .find(function(err, users){
            res.json(users);
        });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/#/login');
}

function ensureAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        UserModel
            .findById(req.user._id)
            .then(function(user){
                if(user.roles.indexOf("admin") > -1) {
                    return next();
                } else {
                    res.redirect('/#/login');
                }
            })
    }
}







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

require("./public/experiments/mongodb/ss/server/app.js")(app, db, mongoose);

require("./public/ds/ss/server/app.js")(app, db, mongoose);
require("./public/ds/fc/server/app.js")(app, db, mongoose);
require("./public/ds/ce/server/app.js")(app, db, mongoose);
require("./public/ds/pe/server/app.js")(app, db, mongoose);

//require("./public/experiments/passport/exp1/server/app.js")(app, db, mongoose, passport);
//require("./public/experiments/passport/exp2/server/app.js")(app, db, mongoose, passport);

app.listen(port, ipaddress);
