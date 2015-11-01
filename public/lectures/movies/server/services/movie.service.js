//var model = require(....);
module.exports = function(app) {
    app.post("/api/lectures/movies/likes/:idIMDB", likes);

    function likes(req, res) {
        var idIMDB = req.params.idIMDB;

        console.log("likes " + idIMDB);

        model.likes();
    }
}