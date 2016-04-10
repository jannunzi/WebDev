/**
 * Created by ameyapandilwar on 3/7/16.
 */

module.exports = function(app, userModel) {
    app.post("/api/ds/catalog/user", createUser);
    app.get("/api/ds/catalog/user", findUser);
    app.get("/api/ds/catalog/user/:id", findUserById);
    app.put("/api/ds/catalog/user/:id", updateUserById);
    app.delete("/api/ds/catalog/user/:id", deleteUserById);
    app.put("/api/ds/catalog/user/:id/enroll", enrollUserInCourse);

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user).then(function(user) {
            req.session.currentUser = user;
            res.json(user);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            userModel.findUserByCredentials({username: username, password: password}).then(function(user) {
                req.session.currentUser = user;
                res.json(user);
            }, function(err) {
                res.status(400).send(err);
            });
        } else if (username) {
            userModel.findUserByUsername(username).then(function(user) {
                res.json(user);
            }, function(err) {
                res.status(400).send(err);
            });
        } else {
            userModel.findAllUsers().then(function(users) {
                res.json(users);
            }, function(err) {
                res.status(400).send(err);
            });
        }
    }

    function findUserById(req, res) {
        var id = req.params.id;
        userModel.findUserById(id).then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function updateUserById(req, res) {
        userModel.updateUser(req.params.id, req.body).then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function deleteUserById(req, res) {
        userModel.deleteUserById(req.params.id).then(function(user) {
            res.json(200);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function enrollUserInCourse(req, res) {
        userModel.enrollUserInCourse(req.params.id, req.body).then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(400).send(err);
        });
    }

};