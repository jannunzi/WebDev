(function () {
    angular
        .module ("GetMoviesApp")
        .factory ("MovieService", MovieService);

    function MovieService ($http) {
        var api = {
            getAllMovies: getAllMovies,
            getMovieById: getMovieById,
            createMovie: createMovie,
            deleteMovieById: deleteMovieById,
            updateMovie: updateMovie
        };
        return api;

        function updateMovie (id, movie) {
            return $http.put ("/api/experiments/express/omdb/update/movie/" + id, movie);
        }

        function deleteMovieById (id) {
            return $http.delete ("/api/experiments/express/omdb/update/movie/" + id);
        }

        function createMovie (movie) {
            return $http.post ("/api/experiments/express/omdb/update/movie", movie);
        }

        function getAllMovies () {
            return $http.get ("/api/experiments/express/omdb/update/movie");
        }

        function getMovieById (id) {
            return $http.get ("/api/experiments/express/omdb/update/movie/" + id);
        }
    }
})();