(function()
{
    angular
        .module("WhiteBoardApp")
        .controller("UserController", UserController);

    function UserController($scope, UserService)
    {
        $scope.users = UserService.findAllUsers();
    }
})();