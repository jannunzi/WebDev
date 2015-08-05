(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("ProfileController", profileController);
		
	function profileController($scope, UserService, $routeParams)
	{
		var id = $routeParams.id;
		
		$scope.id = id;
		
		$scope.user = UserService.findUserById(id);
	}
})();