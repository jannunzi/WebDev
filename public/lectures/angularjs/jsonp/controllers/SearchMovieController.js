(function(){
    angular
        .module("MovieApp")
        .controller("SearchMovieController", SearchMovieController);

    function SearchMovieController($scope, $http, MovieService) {
        $scope.searchMovie = searchMovie;
        $scope.likeMovie = likeMovie;

        function searchMovie(title) {
            MovieService.searchMovieByTitle(title, function(response){
                $scope.response = response;
            });
        };

        function likeMovie(idIMDB) {
            MovieService.likeMovie(idIMDB, function(response){

            });
        };
    }
})();