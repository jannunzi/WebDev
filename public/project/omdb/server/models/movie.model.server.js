module.exports = function() {
    var movies = [];
    var api = {
        findMovieByImdbID: findMovieByImdbID
    };
    return api;

    function findMovieByImdbID(userId, imdbID) {
        for(var m in movies) {
            if(movies[m].imdbID === imdbID) {
                return movies[m];
            }
        }
        return null;
    }
}