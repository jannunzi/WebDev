(function(){
    angular
        .module("MovieAdminApp", [])
        .controller("MovieListController", MovieListController);

    function MovieListController($scope) {
        $scope.movies = [
            {id: 123, title: "Star Wars", director: "JJ Abrams"},
            {id: 234, title: "Avatar", director: "James Cameron"},
            {id: 345, title: "Aliens", director: "James Cameron"}
        ];

        // event handler declarations
        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        // event handler implementation
        function updateMovie(movie) {
            if(selecteMovieIndex >= 0) {
                $scope.movies[selecteMovieIndex] = {
                    id: movie.id,
                    title: movie.title,
                    director: movie.director
                }
            }
        }
        var selecteMovieIndex = -1;
        function selectMovie(movie) {
            selecteMovieIndex = $scope.movies.indexOf(movie);
            console.log(movie);
            $scope.movie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
        }

        function addMovie(movie) {
            var newMovie = {
                id : movie.id,
                title: movie.title,
                director: movie.director
            };
            $scope.movies.push(newMovie);
        }

        function deleteMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            console.log("deleteMovie: " + index);
            $scope.movies.splice(index, 1);
        }

    }
})();