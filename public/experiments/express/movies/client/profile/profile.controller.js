(function(){
    angular
        .module("MovieApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(MovieService, $rootScope) {
        var vm = this;

        function init() {
            if($rootScope.currentUser) {
                vm.likes = $rootScope.currentUser.likes;
//            MovieService.getMovies($rootScope.currentUser.likes);
            }
        }

        init();
    }
})();