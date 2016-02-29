module.exports = function(app, model) {
    app.post("/api/project/user", findUserByCredentials);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }
}