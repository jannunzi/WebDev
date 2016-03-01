(function(){
    angular
        .module("OmdbApp")
        .factory("MovieService", movieService);

    function movieService($http) {
        var api = {
            setUserLikesMovie: setUserLikesMovie
        };
        return api;

        function setUserLikesMovie(userId, imdbID) {
            return $http.post("/api/project/user/"+userId+"/movie/"+imdbID);
        }
    }
})();