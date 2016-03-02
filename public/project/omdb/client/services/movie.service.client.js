(function(){
    angular
        .module("OmdbApp")
        .factory("MovieService", movieService);

    function movieService($http) {
        var api = {
            userLikesMovie: userLikesMovie
        };
        return api;

        function userLikesMovie(userId, movie) {
            return $http.post("/api/project/user/"+userId+"/movie/"+movie.imdbID, movie);
        }
    }
})();