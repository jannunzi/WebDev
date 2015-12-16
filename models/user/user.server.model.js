var bcrypt = require("bcrypt-nodejs");
var q = require("q");

module.exports = function(mongoose, passport, LocalStrategy) {

    var UserSchema = require("./user.server.schema.js")(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        register: register,
        getUserByUserId: getUserByUserId,
        updateUser: updateUser,
        getAllUsers: getAllUsers,
        updateUserAsAdmin: updateUserAsAdmin,
        removeUserAsAdmin: removeUserAsAdmin
    }
    return api;

    function register(newUser) {
        var deferred = q.defer();
        newUser.roles = ['student'];
        UserModel.findOne({username: newUser.username}, function(err, user)
        {
            if(err) {
                deferred.reject(err);
            }
            if(user) {
                deferred.resolve(null);
            }
            var newUser = new UserModel(newUser);
            newUser.password = bcrypt.hashSync(newUser.password);
            newUser.save(function(err, user) {
                deferred.resolve(user);
            });
        });
        return deferred.promise;
    }

    function getUserByUserId(id) {
        var deferred = q.defer();
        UserModel
            .findById(id, function(err, user){
                if(err) {
                    deferred.reject(err);
                }
                if(user) {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateUser(userParam){
        var deferred = q.defer();
        UserModel
            .findById(userParam.id, function(err, user)
            {
                if(err) {
                    deferred.reject(err);
                } else {
                    delete userParam.order;
                    var newUser = userParam;
                    if(userParam.password) {
                        newUser.password = bcrypt.hashSync(userParam.password);
                    }
                    user.update(newUser, function(err, status) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(status);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function getAllUsers(){
        var deffered = q.defer();
        UserModel
            .find(function(err, users){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
        return deffered.promise;
    }

    function updateUserAsAdmin(userParam){
        var deffered = q.defer();
        UserModel
            .findById(userParam.id, function(err, user) {
                if(err) {
                    deffered.reject(err);
                } else {
                    var newUser = userParam;
                    if(userParam.password) {
                        newUser.password = bcrypt.hashSync(userParam.password);
                    }
                    if(userParam.roles) {
                        if(userParam.roles && userParam.roles.indexOf(",")>-1) {
                           userParam.roles =  userParam.roles.split(",");
                        }
                        newUser.roles = userParam.roles;
                    }
                    user.update(newUser, function(err, status) {
                        if(err) {
                            deffered.reject(err);
                        } else {
                            deffered.resolve(status);
                        }
                    });
                }
            });
        return deffered.promise;
    }

    function removeUserAsAdmin(id){
        var deffered = q.defer();
        UserModel
            .remove({_id: id}, function(err, status){
                if(err) {
                    deffered.reject(err);
                } else {
                    deffered.resolve(status);
                }
            });
        return deffered.promise;
    }

};