var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, db, mongoose, passport, LocalStrategy) {

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
            UserModel.findOne({username: username}, function(err, user)
            {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if(bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
        }));

    passport.serializeUser(function(user, done)
    {
        user.password = null;
        done(null, user);
    });

    passport.deserializeUser(function(user, done)
    {
        UserModel.findById(user._id, function(err, user)
        {
            user.password = null;
            done(err, user);
        });
    });

    app.get('api/course', getAllCourses);
    app.post("/api/portal/login", passport.authenticate('local'), login);
    app.get('/api/portal/loggedin', loggedin);
    app.post('/api/portal/logout', logout);
    app.post('/api/portal/register', register);
    app.get("/api/portal/user/:userId", ensureAuthenticated, getUserByUserId);
    app.put("/api/portal/user/:id", ensureAuthenticated, updateUser);
    app.get("/api/portal/admin/user", ensureAdmin, getAllUsers);
    app.put("/api/portal/admin/user/:id", ensureAdmin, updateUserAsAdmin);
    app.delete("/api/portal/admin/user/:id", ensureAdmin, removeUserAsAdmin);

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/#/login');
    }

    function ensureAdmin(req, res, next) {
        if (req.isAuthenticated()) {
            UserModel
                .findById(req.user._id)
                .then(function(user){
                    delete user.password;
                    if(user.roles.indexOf("admin") > -1) {
                        return next();
                    } else {
                        res.redirect('/#/login');
                    }
                })
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
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
            newUser.password = bcrypt.hashSync(newUser.password);
            newUser.save(function(err, user)
            {
                req.login(user, function(err)
                {
                    if(err) { return next(err); }
                    user.password = null;
                    res.json(user);
                });
            });
        });
    }

    function getAllCourses(req, res) {
        var str = '(function(){angular.courses = ';
        str += JSON.stringify(courses);
        str += '})();';
        res.send(str);
    }

    function getUserByUserId(req, res) {
        UserModel
            .findById(req.params.userId, function(err, user){
                if(user) {
                    user.password = null;
                }
                res.json(user);
            });
    }

    function updateUser(req, res){
        UserModel
            .findById(req.params.id, function(err, user)
            {
                var newUser = {};
                if(req.body.password)
                    newUser.password = bcrypt.hashSync(req.body.password);
                if(newUser.password) {
                    user.update({$set: {password: newUser.password}}, function(err, status)
                    {
                        res.send(status);
                    });
                } else {
                    res.send(200);
                }
            });
    }

    function getAllUsers(req, res){
        UserModel
            .find(function(err, users){
                for(var u in users) {
                    users[u].password = null;
                }
                res.json(users);
            });
    }

    function updateUserAsAdmin(req, res){
        UserModel
            .findById(req.params.id, function(err, user)
            {
                var newUser = {};
                if(req.body.password)
                    newUser = bcrypt.hashSync(req.body.password);
                if(req.body.roles){
                    if(req.body.roles && req.body.roles .indexOf(",")>-1) {
                        req.body.roles = req.body.roles .split(",");
                    }
                    newUser.roles = req.body.roles;
                }
                user.update(newUser, function(err, status)
                {
                    res.send(status);
                });
            });
    }

    function removeUserAsAdmin(req, res){
        UserModel
            .remove({_id: req.params.id}, function(err, status){
                res.send(status);
            });
    }
};