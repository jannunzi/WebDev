var model = require("../models/movie.model.js")();

module.exports = function(app) {

    app.post("/api/lectures/movies/likes/:idIMDB", likes);
    app.get("/api/lectures/movies/likes", getLikes);

    function likes(req, res) {
        var idIMDB = req.params.idIMDB;

        var movie = req.body;

        console.log("likes " + idIMDB);

        model.likes(idIMDB, movie);
    }

    function getLikes(req, res) {
        res.json(model.getLikes());
    }
}
