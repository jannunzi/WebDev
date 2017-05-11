/**
 * Created by ameyapandilwar on 2/28/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("AdminController", AdminController)

    function AdminController($scope, UserService) {
        var selectedUser = null;

        $scope.addUser = addUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;

        UserService.findAllUsers(function(callback) {
            $scope.users = callback;
        });

        function selectUser(index) {
            selectedUser = $scope.users[index];
            $scope.username = selectedUser.username;
            $scope.department = selectedUser.department;
            $scope.role = selectedUser.role;
        }

        function addUser(){
            var newUser = {"username": $scope.username, "department": $scope.department, "role": $scope.role};
            UserService.createUser(newUser, function(callback) {
                $scope.users = callback;
                $scope.username = "";
                $scope.department = "";
                $scope.role = "";
            });
        }

        function updateUser() {
            if (selectedUser) {
                selectedUser.username = $scope.username;
                selectedUser.department = $scope.department;
                selectedUser.role = $scope.role;
                UserService.updateUserById(selectedUser._id, selectedUser, function(callback) {
                    $scope.username = "";
                    $scope.department = "";
                    $scope.role = "";
                });
            }
        }

        function deleteUser(index) {
            UserService.deleteUserById($scope.users[index]._id, function(callback) {
                $scope.users = callback;
            });
        }
    }
}());