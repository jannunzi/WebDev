module.exports = function(app, model) {
    app.post("/api/project/user", findUserByCredentials);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        model.findUserByCredentials(credentials);
        res.send(200);
    }
}