module.exports = function() {
    var movies = [];
    var api = {
        findMovieByImdbID: findMovieByImdbID,
        createMovie: createMovie
    };
    return api;

    function createMovie(imdbID) {
        var movie = {
            _id: "ID_" + (new Date()).getTime(),
            imdbID: imdbID
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