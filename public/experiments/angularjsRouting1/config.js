(function()
{
	angular
		.module("WhiteBoardApp")
		.config(function($routeProvider)
		{
			$routeProvider
				.when("/courses",
				{
					templateUrl: "courses/courses.view.html"
				})
		});
})();