/**
 * Created by ameyapandilwar on 2/28/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("AdminController", AdminController)

    function AdminController(CourseService, UserService) {
        var vm = this;
        var selectedCourse = null;

        vm.addCourse = addCourse;
        vm.deleteCourse = deleteUser;
        vm.selectCourse = selectCourse;
        vm.updateCourse = updateCourse;

        vm.makeAdmin = makeAdmin;

        CourseService.findAllCourses().then(function(response) {
            vm.courses = response.data;
        });

        UserService.findAllUsers().then(function(response) {
            vm.users = response.data;
        });

        function selectCourse(index) {
            selectedCourse = vm.courses[index];
            vm.selectedCourse = selectedCourse;
        }

        function addCourse(){
            var newCourse = vm.selectedCourse;
            CourseService.createCourse(newCourse).then(function(response) {
                vm.courses = response.data;
                vm.selectedCourse = null;
            });
        }

        function updateCourse() {
            if (selectedCourse) {
                CourseService.updateCourseById(selectedCourse._id, selectedCourse).then(function(response) {
                    vm.selectedCourse = null;
                });
            }
        }

        function deleteUser(index) {
            CourseService.deleteCourseById(vm.courses[index]._id).then(function(response) {
                vm.courses = response.data;
            });
        }

        function makeAdmin(index) {
            var selectedUser = vm.users[index];
            selectedUser.roles.push('admin');
            UserService.updateUserById(selectedUser._id, selectedUser).then(function(response) {
                UserService.findAllUsers().then(function(response) {
                    vm.users = response.data;
                });
            });
        }
    }
}());