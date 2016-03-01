(function(){
    angular
        .module("OmdbApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, OmdbService) {
        var vm = this;
        var imdbID = $routeParams.imdbID;

        function init() {
            OmdbService
                .findMovieByImdbID(imdbID)
                .then(function(response){
                    console.log(response.data);
                });
        }
        init();
    }
})();