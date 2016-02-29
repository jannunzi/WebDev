module.exports = function(app, model) {
    app.post("/api/project/login", findUserByCredentials);
    app.get("/api/project/loggedin", loggedin);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }
}