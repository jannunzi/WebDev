/**
 * Created by ameyapandilwar on 3/11/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("CourseController", CourseController)

    function CourseController($location, CourseService, ModuleService, UserService, $routeParams) {
        var vm = this;

        vm.viewModule = viewModule;
        vm.enrollInCourse = enrollInCourse;

        CourseService.getCourseByNumber($routeParams.id).then(function(response) {
            vm.course = response.data;
            CourseService.setCurrentCourse(vm.course);
        })

        function viewModule(index) {
            var selectedModule = vm.course.modules[index];
            ModuleService.setCurrentModule(selectedModule);
            $location.url("/course/" + vm.course.number + "/module/" + selectedModule.number);
        }

        function enrollInCourse(user) {
            UserService.enrollUserInCourse(user._id, vm.course).then(function(response) {
                UserService.setCurrentUser(response.data);
            });

            CourseService.registerUserToCourse(user.username, vm.course._id).then(function(response) {
                vm.course = response.data;
                CourseService.setCurrentCourse(vm.course);
            });
        }
    }
}());
