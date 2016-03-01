(function(){
    angular
        .module("OmdbApp")
        .factory("OmdbService", omdbService);

    function omdbService($http) {
        var api = {
            searchMovieByTitle: searchMovieByTitle,
            findMovieByImdbID: findMovieByImdbID
        };
        return api;

        function findMovieByImdbID(imdbID) {
            return $http.get("http://www.omdbapi.com/?i="+imdbID);
        }

        function searchMovieByTitle(title) {
            return $http.get("http://www.omdbapi.com/?s="+title);
        }
    }
})();