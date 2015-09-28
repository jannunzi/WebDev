(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("courseOverview.controller", courseOverviewController);
		
	function courseOverviewController($scope)
	{
		$scope.hello = "Hello";
	}
})();