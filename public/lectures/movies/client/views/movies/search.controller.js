(function()
{
    angular
        .module("MovieApp")
        .controller("SearchMovieController", SearchMovieController);

    function SearchMovieController($scope, MovieService)
    {
        var model = this;
        model.search = search;
        model.like = like;

        function like(idIMDB) {
            MovieService.likes(idIMDB);
        }

        function search(title) {

            MovieService.searchMovieByTitle(title).then(function(response){
                model.results = response;
            });
        }
    }
})();
