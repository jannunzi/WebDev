/**
 * Created by ameyapandilwar on 2/28/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("AdminController", AdminController)

    function AdminController($scope, CourseService) {
        var selectedCourse = null;

        $scope.addCourse = addCourse;
        $scope.deleteCourse = deleteUser;
        $scope.selectCourse = selectCourse;
        $scope.updateCourse = updateCourse;

        CourseService.findAllCourses().then(function(response) {
            $scope.courses = response.data;
        });

        function selectCourse(index) {
            selectedCourse = $scope.courses[index];
            $scope.selectedCourse = selectedCourse;
        }

        function addCourse(){
            var newCourse = $scope.selectedCourse;
            CourseService.createCourse(newCourse).then(function(response) {
                $scope.courses = response.data;
                $scope.selectedCourse = null;
            });
        }

        function updateCourse() {
            if (selectedCourse) {
                CourseService.updateCourseById(selectedCourse._id, selectedCourse).then(function(response) {
                    $scope.selectedCourse = null;
                });
            }
        }

        function deleteUser(index) {
            CourseService.deleteCourseById($scope.courses[index]._id).then(function(response) {
                $scope.courses = response.data;
            });
        }
    }
}());