module.exports = function() {
    var movies = [];
    var api = {
        findMovieByImdbID: findMovieByImdbID,
        createMovie: createMovie
    };
    return api;

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