module.exports = function (app, model) {

    app.get("/api/experiments/express/omdb/update/movie", getAllMovies);
    app.get("/api/experiments/express/omdb/update/movie/:id", getMovieById);
    app.post("/api/experiments/express/omdb/update/movie", createMovie);
    app.delete("/api/experiments/express/omdb/update/movie/:id", deleteMovieById);
    app.put("/api/experiments/express/omdb/update/movie/:id", updateMovieById);

    function updateMovieById (req, res) {
        var id = req.params.id;
        var movie = req.body;
        movie = model.updateMovie(id, movie);
        if(movie) {
            res.json(movie);
            return;
        }
        res.json({message: "Movie not found"});
    }

    function createMovie (req, res) {
        var movie = req.body;
        model.createMovie(movie);
        res.send (200);
    }

    function getAllMovies (req, res) {
        var movies = model.findAllMovies();
        res.json(movies);
    }

    function getMovieById (req, res) {
        var id = req.params.id;
        var movie = model.findMovieById(id);
        if(movie) {
            res.json(movie);
            return;
        }
        res.json({message: "Movie not found"});
    }

    function deleteMovieById (req, res) {
        var id = req.params.id;
        if(model.deleteMovie(id)) {
            res.send(200);
            return;
        }
        res.json ({message: "Movie not found"});
    }
}