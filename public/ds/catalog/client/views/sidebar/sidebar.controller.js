/**
 * Created by ameyapandilwar on 3/2/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location) {
        var vm = this;

        vm.getTabClass = getTabClass;

        function getTabClass(currentCourse, module) {
            var pattern = '/course/' + currentCourse.number + '/module/' + module.number;
            if ($location.url().indexOf(pattern) > -1) {
                return 'customSelectedTab';
            }
        }
    }
}());