(function () {
    angular
        .module ("GetMoviesApp")
        .factory ("MovieService", MovieService);

    function MovieService ($http) {
        var api = {
            getAllMovies: getAllMovies,
            getMovieById: getMovieById,
            createMovie: createMovie,
            deleteMovieById: deleteMovieById
        };
        return api;

        function deleteMovieById (id) {
            return $http.delete ("/api/experiments/express/omdb/delete/movie/" + id);
        }

        function createMovie (movie) {
            return $http.post ("/api/experiments/express/omdb/delete/movie", movie);
        }

        function getAllMovies () {
            return $http.get ("/api/experiments/express/omdb/delete/movie");
        }

        function getMovieById (id) {
            return $http.get ("/api/experiments/express/omdb/delete/movie/" + id);
        }
    }
})();