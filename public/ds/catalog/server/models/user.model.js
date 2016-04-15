/**
 * Created by ameyapandilwar on 3/7/16.
 */

var q = require('q');

module.exports = function (db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('CatalogUser', UserSchema);

    var api = {
        createUser: createUser,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        enrollUserInCourse: enrollUserInCourse,
        disenrollUserFromCourse: disenrollUserFromCourse
    };

    return api;

    function findUserByCredentials(credentials) {
        return UserModel.findOne({username: credentials.username, password: credentials.password});
    }

    function findUserById(id) {
        return UserModel.findById(id);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find(
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function (err, res) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    function deleteUserById(id) {
        var deferred = q.defer();

        UserModel.remove({_id: id},
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function updateUser(id, user) {
        var deferred = q.defer();

        UserModel.update(
            {_id: id},
            {$set: user},
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function enrollUserInCourse(id, course) {
        var deferred = q.defer();

        UserModel.findById(id, function(err, user) {
            user.courses.push(course);
            user.save(function(err, saved) {
                getUserById(saved._id).then(function(user) {
                    deferred.resolve(user);
                });
            });
        });

        return deferred.promise;
    }

    function disenrollUserFromCourse(id, courseNumber) {
        var deferred = q.defer();

        UserModel.findById(id, function(err, user) {
            for (c in user.courses) {
                if (user.courses[c].number == courseNumber) {
                    user.courses.splice(c, 1);
                }
            }
            user.save(function(err, saved) {
                getUserById(saved._id).then(function(user) {
                    deferred.resolve(user);
                });
            });
        });

        return deferred.promise;
    }

    function getUserById(id){
        var deferred = q.defer();

        UserModel.findById(id, function(err, user){
            deferred.resolve(user);
        });

        return deferred.promise;
    }
};