(function(){
    angular
        .module("OmdbApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, OmdbService, $rootScope, $location) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;

        function init() {
            OmdbService
                .findMovieByImdbID(imdbID)
                .then(function(response){
                    vm.data = response.data;
                });
        }
        init();

        function favorite(imdbDB) {
            if(currentUser) {
                console.log([currentUser.username, imdbDB]);
            } else {
                $location.url("/login");
            }
        }
    }
})();