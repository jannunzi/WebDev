module.exports = function (app) {

    app.get("/api/experiments/express/omdb/update/movie", getAllMovies);
    app.get("/api/experiments/express/omdb/update/movie/:id", getMovieById);
    app.post("/api/experiments/express/omdb/update/movie", createMovie);
    app.delete("/api/experiments/express/omdb/update/movie/:id", deleteMovieById);
    app.put("/api/experiments/express/omdb/update/movie/:id", updateMovieById);

    var movies = [
        {_id: "123asd", title: "Star Wars: Episode IV - A New Hope", director: "George Lucas"},
        {_id: "234dsa", title: "Star Trek Beyond", director: "Justin Lin"}
    ];

    function updateMovieById (req, res) {
        var id = req.params.id;
        var movie = req.body;
        for (var m in movies) {
            if (movies[m]._id === id) {
                movies[m].title = movie.title;
                movies[m].director = movie.director;
                res.json(movies[m]);
                return;
            }
        }
        res.json({message: "Movie not found"});
    }

    function createMovie (req, res) {
        var movie = req.body;
        var now = new Date();
        movie._id = "id" + now.getTime();
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

    function deleteMovieById (req, res) {
        var id = req.params.id;
        for (var m in movies) {
            if (movies[m]._id === id) {
                movies.splice(m, 1);
                res.send (200);
                return;
            }
        }
        res.json ({message: "Movie not found"});
    }
};