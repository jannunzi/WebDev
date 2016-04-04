/**
 * Created by ameyapandilwar on 3/8/16.
 */

var users = require("./user.mock.json");

module.exports = function() {

    var api = {
        createUser: createUser,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        updateUser: updateUser
    };

    return api;

    function findUserByCredentials(credentials) {
        for (var u in users) {
            if (users[u].username == credentials.username && users[u].password == credentials.password) {
                return users[u];
            }
        }

        return null;
    }

    function findUserById(userId) {
        for (var u in users){
            if (users[u]._id == userId) {
                return users[u];
            }
        }

        return null;
    }

    function findUserByUsername(username) {
        for (var u in users){
            if (users[u].username == username) {
                return users[u];
            }
        }

        return null;
    }

    function findAllUsers() {
        return users;
    }

    function createUser(user) {
        var newUser = {
            _id: (new Date).getTime().toString(),
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            email: user.email
        };

        users.push(newUser);
        return newUser;
    }

    function deleteUserById(userId) {
        var user = findUserById(userId);
        if (user) {
            users.splice(users.indexOf(user), 1);
        }

        return null;
    }

    function updateUser(userId, user) {
        var existingUser = findUserById(userId);
        if (existingUser) {
            existingUser.firstName = user.firstName;
            existingUser.lastName = user.lastName;
            existingUser.password = user.password;
            existingUser.username = user.username;
            existingUser.roles = user.roles;
            existingUser.email = user.email;
            return existingUser;
        } else {
            return null;
        }
    }

};