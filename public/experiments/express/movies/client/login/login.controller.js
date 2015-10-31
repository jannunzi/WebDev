(function(){
    angular
        .module("MovieApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {
        var vm = this;

        vm.login = login;

        function login(username, password) {
            UserService.login(username, password).then(
            function(response){
                $rootScope.currentUser = response;
                $location.url("/profile");
            });
        }
    }
})();