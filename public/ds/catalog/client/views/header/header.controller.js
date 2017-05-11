/**
 * Created by ameyapandilwar on 3/1/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        $scope.showDropdown = showDropdown;
        $scope.logout = logout;

        function showDropdown() {
            return ($location.url() === '/home' || $location.url() === '/proposal' || $location.url() === '/mockups');
        }

        function logout() {
            UserService.setCurrentUser(null);
            $location.url('/poc');
        }
    }
}());