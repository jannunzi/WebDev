(function(){
    angular
        .module("OmdbApp")
        .factory("OmdbService", omdbService);

    function omdbService() {
        var api = {
            searchMovieByTitle: searchMovieByTitle
        };
        return api;

        function searchMovieByTitle(title) {
            console.log(title);
        }
    }
})();