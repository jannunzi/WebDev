module.exports = function(app, movieModel, userModel) {
    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    app.get("/api/project/movie/:imdbID/user", findUserLikes);

    function findUserLikes (req, res) {
        var imdbID = req.params.imdbID;
        console.log(imdbID);
        var movie = movieModel.findMovieByImdbID(imdbID);
        if(movie) {
            var userLikes = movie.likes;
            console.log(userLikes);
            var users = userModel.findUsersByIds(userLikes);
            movie.userLikes = users;
        }
        res.json(movie);
    }

    function userLikesMovie(req, res) {
        var movieOmdb  = req.body;
        var userId = req.params.userId;
        var imdbID = req.params.imdbID;
        var movie;

        movieModel
            .userLikesMovie(userId, movieOmdb)
            // add user to movie likes
            .then(
                function (movie) {
                    return userModel.userLikesMovie(userId, movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}