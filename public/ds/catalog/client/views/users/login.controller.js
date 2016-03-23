/**
 * Created by ameyapandilwar on 3/20/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("LoginController", LoginController)

    function LoginController($scope, $location, UserService) {
        $scope.login = login;

        function login() {
            var username = $scope.username;
            var password = $scope.password;

            UserService.findUserByCredentials(username, password, function(callback) {
                UserService.setCurrentUser(callback);
                $location.url('/profile');
            });
        }
    }
}());