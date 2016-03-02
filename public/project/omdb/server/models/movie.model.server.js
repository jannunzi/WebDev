module.exports = function() {
    var movies = [];
    var api = {
        findMovieByImdbID: findMovieByImdbID,
        findMoviesByImdbIDs: findMoviesByImdbIDs,
        createMovie: createMovie
    };
    return api;

    function findMoviesByImdbIDs (imdbIDs) {
        var movies = [];
        for (var id in imdbIDs) {
            var movie = findMovieByImdbID (imdbIDs[id]);
            if (movie) {
                movies.push(movie);
            }
        }
        return movies;
    }

    function createMovie(movie) {
        movie = {
            _id: "ID_" + (new Date()).getTime(),
            imdbID: movie.imdbID,
            poster: movie.Poster,
            title: movie.Title
        };
        movies.push(movie);
        return movie;
    }

    function findMovieByImdbID(imdbID) {
        for(var m in movies) {
            if(movies[m].imdbID === imdbID) {
                return movies[m];
            }
        }
        return null;
    }
}