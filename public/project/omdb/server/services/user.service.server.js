module.exports = function(app, model) {
    app.post("/api/project/login", findUserByCredentials);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);

    function register(req, res) {
        var user = req.body;
        user = model.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}