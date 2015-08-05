(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("HomeController", homeController);
	
	function homeController($scope, CourseService)
	{
		$scope.courses = CourseService.findAllCourses();
	}
})();