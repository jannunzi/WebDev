(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("UsersController", usersController);
		
	function usersController($scope, UserService)
	{
		$scope.users = UserService.findAllUsers();
		
		$scope.addNewUser = function(newUser)
		{
			UserService.createUser(newUser);
			$scope.users = UserService.findAllUsers();
		}
		
		$scope.removeUser = function(index)
		{
			UserService.removeUserById(index);
			$scope.users = UserService.findAllUsers();
		}
	}
})();