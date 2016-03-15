var mock = require("./user.mock.json");

// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        userLikesMovie: userLikesMovie
    };
    return api;

    // add movie to user likes
    function userLikesMovie (userId, movie) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.likes.push (movie.imdbID);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }

    function findUsersByIds (userIds) {
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    // use user model find by id
    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser(user) {

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
              password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

        });

        return deferred.promise;
    }
}