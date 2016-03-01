module.exports = function(app, movieModel) {
    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);

    function userLikesMovie(req, res) {
        var userId = req.params.userId;
        var imdbID = req.params.imdbID;
        var movie = movieModel.findMovieByImdbID(imdbID);
        console.log([userId, imdbID, movie]);
        res.send(200);
    }
}