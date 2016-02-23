(function () {
    angular
        .module ("GetMoviesApp")
        .factory ("MovieService", MovieService);

    function MovieService ($http) {
        var api = {
            getAllMovies: getAllMovies,
            getMovieById: getMovieById,
            createMovie: createMovie
        };
        return api;

        function createMovie (movie) {
            return $http.post ("/api/experiments/express/omdb/post/movie", movie);
        }

        function getAllMovies () {
            return $http.get ("/api/experiments/express/omdb/post/movie");
        }

        function getMovieById (id) {
            return $http.get ("/api/experiments/express/omdb/post/movie/" + id);
        }
    }
})();