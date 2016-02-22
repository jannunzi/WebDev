(function(){
    angular
        .module("RegisterExample")
        .controller("RegisterController", registerController);

    function registerController($location, $scope, UserService) {
        $scope.register = register;

        function register(user) {
            UserService
                .findUserByUsername(user.username);
        }
    }
})();