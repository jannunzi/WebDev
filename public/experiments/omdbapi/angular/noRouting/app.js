(function(){
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";

    angular
        .module("OmdbApi", [])
        .controller("SearchController", SearchController);

    function SearchController($scope, $http) {
        $scope.movieTitle = "Star Wars";

        $scope.searchMovie = searchMovie;
        $scope.selectMovie = selectMovie;

        function selectMovie(movie) {
            var url = DETAILS_URL.replace("IMDBID", movie.imdbID);
            $http.get(url)
                .success(renderDetails);
        }

        function renderDetails(response) {
            console.log(response);
            $scope.details = response;
        }

        function searchMovie(movieTitle) {
            var url = SEARCH_URL
                .replace("TITLE", movieTitle)
                .replace("PAGE", 1);
            $http.get(url)
                .success(renderMovies);
        }

        function renderMovies(response) {
            $scope.data = response;
        }
    }
})();