module.exports = function (app) {

    app.get("/api/experiments/express/omdb/post/movie", getAllMovies);
    app.get("/api/experiments/express/omdb/post/movie/:id", getMovieById);

    app.post("/api/experiments/express/omdb/post/movie", createMovie);

    var movies = [
        {_id: "123asd", title: "Star Wars: Episode IV - A New Hope", director: "George Lucas"},
        {_id: "234dsa", title: "Star Trek Beyond", director: "Justin Lin"}
    ];

    function createMovie (req, res) {
        var movie = req.body;
        movies.push (movie);
        res.send (200);
    }

    function getAllMovies (req, res) {
        res.json(movies);
    }

    function getMovieById (req, res) {
        var id = req.params.id;
        for (var m in movies) {
            if (movies[m]._id === id) {
                res.json(movies[m]);
                return;
            }
        }
        res.json({message: "Movie not found"});
    }
};