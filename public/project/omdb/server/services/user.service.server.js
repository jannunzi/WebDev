module.exports = function(app) {
    app.post("/api/project/user", findUserByCredentials);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        console.log(credentials);
        res.send(200);
    }
}