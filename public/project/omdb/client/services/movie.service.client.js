(function(){
    angular
        .module("OmdbApp")
        .factory("MovieService", movieService);

    function movieService() {
        var api = {
            setUserLikesMovie: setUserLikesMovie
        };
        return api;

        function setUserLikesMovie(userId, imdbID) {
            console.log([userId, imdbID]);
        }
    }
})();