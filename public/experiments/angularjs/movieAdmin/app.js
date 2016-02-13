(function(){
    angular
        .module("MovieAdminApp", [])
        .controller("MovieController", MovieController);

    function MovieController($scope) {
        $scope.movies = [
            {id: 123, title: "Star Wars", director: "JJ Abrams"},
            {id: 234, title: "Blade Runner", director: "Ridley Scott"},
            {id: 345, title: "Aliens", director: "James Cameron"}
        ];

        // event handler declarations
        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        // event handler implementation
        function updateMovie(movie) {
            $scope.movies[selectedMovieIndex] = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
        }

        function addMovie(movie) {
            var newMovie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
            $scope.movies.push(newMovie);
            $scope.movie = {};
        }

        function deleteMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        }

        var selectedMovieIndex = null;
        function selectMovie(movie) {
            console.log(movie);
            selectedMovieIndex = $scope.movies.indexOf(movie);

            $scope.movie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
        }
    }
})();