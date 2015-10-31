(function(){
    angular
        .module("MovieApp")
        .controller("MovieSearchController", MovieSearchController);

    function MovieSearchController(MovieService, $rootScope, $location) {
        var vm = this;

        vm.search = search;
        vm.like   = like;

        function like(idIMDB) {
            console.log(idIMDB);
            MovieService.like($rootScope.currentUser.id, idIMDB).then(function(response){
                $rootScope.currentUser = response;
                $location.url("/profile");
            });
        }

        function search(title) {
            MovieService.search(title).then(function(response){
                vm.movies = response;
            });
        }
    }
})();