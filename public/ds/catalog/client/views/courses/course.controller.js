/**
 * Created by ameyapandilwar on 3/11/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("CourseController", CourseController)

    function CourseController($rootScope, $location, CourseService, ModuleService) {
        var vm = this;

        var selectedCourse = CourseService.getCurrentCourse();
        vm.course = selectedCourse;

        vm.addCourse = addCourse;
        vm.deleteCourse = deleteCourse;
        vm.selectCourse = selectCourse;
        vm.updateCourse = updateCourse;
        vm.viewCourses = viewCourses;
        vm.viewModule = viewModule;

        function viewCourses() {
            CourseService.findAllCourses().then(function(response) {
                vm.courses = response.data;
            });
        }

        function viewModule(index) {
            var selectedModule = selectedCourse.modules[index];
            ModuleService.setCurrentModule(selectedModule);
            $location.url("/course/" + selectedCourse.number + "/module/" + selectedModule.number);
        }

        function selectCourse(index) {
            selectedCourse = vm.courses[index];
            vm.number = selectedCourse.number;
            vm.timing = selectedCourse.timing;
            vm.location = selectedCourse.location;
        }

        function addCourse(){
            var newCourse = {"number": vm.number, "timing": vm.timing, "location": vm.location};
            CourseService.createCourse(newCourse).then(function(response) {
                vm.courses = response.data;
                vm.number = "";
                vm.timing = "";
                vm.location = "";
            });
        }

        function updateCourse() {
            if (selectedCourse) {
                selectedCourse.number = vm.number;
                selectedCourse.timing = vm.timing;
                selectedCourse.location = vm.location;
                CourseService.updateCourseById(selectedCourse._id, selectedCourse).then(function(response) {
                    vm.number = "";
                    vm.timing = "";
                    vm.location = "";
                });
            }
        }

        function deleteCourse(index) {
            CourseService.deleteCourseById(vm.courses[index]._id).then(function(response) {
                vm.courses = response.data;
            });
        }

    }
}());
