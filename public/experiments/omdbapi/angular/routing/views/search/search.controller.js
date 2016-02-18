(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";

    angular
        .module("OmdbApi")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http, $routeParams, $location, MovieService) {

        $scope.movieTitle = "Star Wars";

        function init() {
            var movieTitle = $routeParams.title;
            if(movieTitle) {
                fetchMovie(movieTitle);
            }
        }
        init();

        function fetchMovie(movieTitle) {
            MovieService.findMoviesByTitle(movieTitle, renderMovies)
        }

        function renderMovies(response) {
            $scope.data = response;
        }
    }
})();