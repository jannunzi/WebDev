/**
 * Created by ameyapandilwar on 3/20/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("UserController", UserController);

    function UserController($location, UserService, CourseService) {
        var vm = this;
        vm.error = null;
        vm.message = null;

        vm.update = update;
        vm.removeCourse = removeCourse;
        vm.viewCourse = viewCourse;

        CourseService.setCurrentCourse(null);

        vm.currentUser = UserService.getCurrentUser();
        if (!vm.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            vm.error = null;
            vm.message = null;

            if (user == null) {
                vm.error = "Please fill in the required fields";
                return;
            }
            if (!user.password) {
                vm.error = "Please provide a password";
                return;
            }
            if (!user.firstName) {
                vm.error = "Please provide a first name";
                return;
            }
            if (!user.lastName) {
                vm.error = "Please provide a last name";
                return;
            }
            if (!user.email) {
                vm.error = "Please provide an email";
                return;
            }

            UserService.updateUserById(user._id, user).then(function(response) {
                UserService.setCurrentUser(user);
                vm.message = "User updated successfully";
                $location.url('/profile');
            });
        }

        function removeCourse(course) {
            UserService.disenrollUserFromCourse(vm.currentUser._id, course.number).then(function(response) {
                UserService.setCurrentUser(response.data);
                vm.currentUser = UserService.getCurrentUser();
            });

            CourseService.deregisterUserFromCourse(vm.currentUser.username, course._id).then(function(response) {});
        }

        function viewCourse(course) {
            $location.url('/course/' + course.number);
        }
    }
}());