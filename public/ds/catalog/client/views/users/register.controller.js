/**
 * Created by ameyapandilwar on 3/20/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("RegisterController", RegisterController)

    function RegisterController($scope, $location, UserService){
        $scope.message = null;
        $scope.register = register;

        function register(user){
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifypassword) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.verifypassword) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!user.email) {
                $scope.message = "Please provide an email";
                return;
            }
            var user = UserService.findUserByUsername(user.username);
            if (user != null) {
                $scope.message = "User already exists";
                return;
            }

            UserService.createUser($scope.user, function(callback) {
                UserService.setCurrentUser(callback);
                $location.url('/profile');
            });

        }

    }
}());