/**
 * Created by ameyapandilwar on 3/11/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("CourseController", CourseController)

    function CourseController($location, CourseService, ModuleService, UserService) {
        var vm = this;

        var selectedCourse = CourseService.getCurrentCourse();
        vm.course = selectedCourse;

        vm.viewModule = viewModule;
        vm.enrollInCourse = enrollInCourse;

        function viewModule(index) {
            var selectedModule = selectedCourse.modules[index];
            ModuleService.setCurrentModule(selectedModule);
            $location.url("/course/" + selectedCourse.number + "/module/" + selectedModule.number);
        }

        function enrollInCourse(user) {
            UserService.enrollUserInCourse(user._id, selectedCourse).then(function(response) {
                UserService.setCurrentUser(response.data);
            });

            CourseService.registerUserToCourse(user.username, selectedCourse._id).then(function(response) {
                vm.course = response.data;
                CourseService.setCurrentCourse(response.data);
            });
        }
    }
}());
