/**
 * Created by ameyapandilwar on 3/11/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("BrochureController", BrochureController)

    function BrochureController($location, CourseService) {
        var vm = this;
        var selectedCourse = null;

        vm.addCourse = addCourse;
        vm.deleteCourse = deleteCourse;
        vm.selectCourse = selectCourse;
        vm.updateCourse = updateCourse;
        vm.viewCourse = viewCourse;

        CourseService.findAllCourses().then(function(response) {
            vm.courses = response.data;
        });

        function selectCourse(index) {
            selectedCourse = vm.courses[index];
            vm.number = selectedCourse.number;
            vm.timing = selectedCourse.timing;
            vm.location = selectedCourse.location;
        }

        function addCourse() {
            var newCourse = {"number": vm.number, "timing": vm.timing, "location": vm.location};
            CourseService.createCourse(newCourse, function(callback) {
                vm.courses = callback;
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
                CourseService.updateCourseById(selectedCourse._id, selectedCourse, function(callback) {
                    vm.number = "";
                    vm.timing = "";
                    vm.location = "";
                });
            }
        }

        function deleteCourse(index) {
            CourseService.deleteCourseById(vm.courses[index]._id, function(callback) {
                vm.courses = callback;
            });
        }

        function viewCourse(index) {
            selectedCourse = vm.courses[index];
            CourseService.setCurrentCourse(selectedCourse);
            $location.url('/course/'+selectedCourse.number);
        }
    }
}());
