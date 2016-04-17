/**
 * Created by ameyapandilwar on 3/20/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("LoginController", LoginController)

    function LoginController($location, UserService, CourseService) {
        var vm = this;
        vm.login = login;

        CourseService.setCurrentCourse(null);

        function login() {
            if (!vm.username || !vm.password) {
                vm.error = "Username & Password Required";
                return;
            }
            UserService.login({username: vm.username, password: vm.password}).then(function(response) {
                if (response) {
                    UserService.setCurrentUser(response.data);
                    $location.path('/profile');
                }
            },
            function(err) {
                vm.error = "Invalid Username/Password";
            });
        }
    }
}());