/**
 * Created by ameyapandilwar on 3/20/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("LoginController", LoginController)

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login() {
            var username = vm.username;
            var password = vm.password;

            UserService.findUserByCredentials(username, password).then(function(response) {
                UserService.setCurrentUser(response.data);
                $location.url('/profile');
            });
        }
    }
}());