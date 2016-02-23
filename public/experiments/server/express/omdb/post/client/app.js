(function () {
    angular
        .module("GetMoviesApp", [])
        .controller("GetMoviesController", GetMoviesController);

    function GetMoviesController ($scope, MovieService) {

        $scope.getMovieById = getMovieById;
        $scope.createMovie  = createMovie;

        function init () {
            MovieService
                .getAllMovies()
                .then(renderAllMovies, renderError);
        }
        init();

        function createMovie (movie) {
            MovieService
                .createMovie(movie)
                .then(function () {
                    return MovieService.getAllMovies();
                })
                .then(renderAllMovies, renderError);
        }

        function getMovieById (id) {
            MovieService
                .getMovieById(id)
                .then(renderMovie, renderError);
        }

        function renderAllMovies (response) {
            $scope.movies = response.data;
        }

        function renderMovie (response) {
            $scope.movie = response.data;
        }

        function renderError (error) {
            $scope.error = "Unable to render movie";
        }
    }
})();