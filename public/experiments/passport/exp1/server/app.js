var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, db, mongoose, passport) {

    var UserModel   = require("./models/user.model.server.js")(mongoose);
    var UserService = require("./services/user.service.server.js")(app, UserModel, passport);

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
};
