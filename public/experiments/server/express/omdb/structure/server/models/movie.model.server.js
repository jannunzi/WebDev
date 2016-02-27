module.exports = function() {
    var movies = [
        {_id: "123asd", title: "Star Wars: Episode IV - A New Hope", director: "George Lucas"},
        {_id: "234dsa", title: "Star Trek Beyond", director: "Justin Lin"}
    ];
    var api = {
        createMovie: createMovie,
        findMovieById: findMovieById,
        findAllMovies: findAllMovies,
        updateMovie: updateMovie,
        deleteMovie: deleteMovie
    };
    return api;

    function createMovie (movie) {
        var now = new Date();
        movie._id = "id" + now.getTime();
        movies.push (movie);
        return movie;
    }

    function updateMovie (id, movie) {
        for (var m in movies) {
            if (movies[m]._id === id) {
                movies[m].title = movie.title;
                movies[m].director = movie.director;
                return movies[m];
            }
        }
        return null;
    }

    function findAllMovies () {
        return movies;
    }

    function findMovieById (id) {
        for (var m in movies) {
            if (movies[m]._id === id) {
                return movies[m];
            }
        }
        return null;
    }

    function deleteMovie (id) {
        for (var m in movies) {
            if (movies[m]._id === id) {
                movies.splice(m, 1);
                return true;
            }
        }
        return false;
    }
}