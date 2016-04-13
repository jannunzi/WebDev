/**
 * Created by ameyapandilwar on 3/11/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("BrochureController", BrochureController)

    function BrochureController($scope, $location, ngDialog, CourseService) {
        var vm = this;
        var selectedCourse = null;

        vm.viewCourse = viewCourse;
        vm.newCourse = newCourse;
        vm.removeCourse = removeCourse;
        vm.modifyCourse = modifyCourse;

        CourseService.findAllCourses().then(function(response) {
            vm.courses = response.data;
        });

        function viewCourse(index) {
            selectedCourse = vm.courses[index];
            CourseService.setCurrentCourse(selectedCourse);
            $location.url('/course/' + selectedCourse.number);
        }

        function newCourse() {
            vm.addingType = "course";
            showAddDialog(function(model){
                var course = {
                    "number": model.number,
                    "title": model.title,
                    "modules": []
                };

                CourseService.createCourse(course).then(function(response) {
                    CourseService.findAllCourses().then(function(response) {
                        vm.courses = response.data;
                    });
                });
            });
            vm.number = "";
            vm.title = "";
        }

        function removeCourse(index) {
            vm.title = vm.courses[index].title;
            showRemoveDialog(function(){
                CourseService.deleteCourseById(vm.courses[index]._id).then(function(response) {
                    CourseService.findAllCourses().then(function(response) {
                        vm.courses = response.data;
                    });
                });
            });
        }

        function modifyCourse(index) {
            vm.addingType = "course";
            vm.course = vm.courses[index];
            showUpdateDialog(function(model){
                selectedCourse = vm.course;
                selectedCourse.number = model.number;
                selectedCourse.title = model.title;

                CourseService.updateCourseById(selectedCourse._id, selectedCourse).then(function(response) {
                    CourseService.findAllCourses().then(function(response) {
                        vm.courses = response.data;
                    });
                });
            });
            vm.number = "";
            vm.title = "";
        }

        function showAddDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'views/courses/add.html', scope: $scope}).then(confirm, cancel);
        }

        function showRemoveDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'views/courses/delete.html', scope: $scope}).then(confirm, cancel);
        }

        function showUpdateDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'views/courses/update.html', scope: $scope}).then(confirm, cancel);
        }
    }
}());
