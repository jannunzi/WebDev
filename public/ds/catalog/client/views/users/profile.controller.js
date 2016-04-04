/**
 * Created by ameyapandilwar on 3/20/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService) {
        var vm = this;
        vm.error = null;
        vm.message = null;

        vm.update = update;

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

            var userId = user._id;

            UserService.updateUserById(userId, user).then(function(response) {
                UserService.setCurrentUser(user);
                vm.message = "User updated successfully";
                $location.url('/profile');
            });
        }
    }
}());