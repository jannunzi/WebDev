(function(){
    angular
        .module("OmdbApp")
        .factory("OmdbService", omdbService);

    function omdbService($http) {
        var api = {
            searchMovieByTitle: searchMovieByTitle
        };
        return api;

        function searchMovieByTitle(title) {
            return $http.get("http://www.omdbapi.com/?s="+title);
        }
    }
})();