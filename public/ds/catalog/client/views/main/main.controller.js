/**
 * Created by ameyapandilwar on 3/20/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("MainController", MainController)

    function MainController($scope, $location) {
        $scope.$location = $location;

        $scope.hideSidebar = hideSidebar;

        function hideSidebar() {
            return ($location.url() === '/home');
        }
    }
}());