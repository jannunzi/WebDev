(function()
{
	angular
		.module("WhiteBoardApp")
		.config(function($routeProvider)
		{
			$routeProvider
				.when("/", 
				{
					templateUrl: "courseList/courseList.view.html",
					controller: "courseList.controller"
				})
				.when("/course/:index",
					{
						templateUrl: "courseOverview/courseOverview.view.html",
						controller: "courseOverview.controller"
					})
				.when("/boxes",
					{
						templateUrl: "boxes.html",
						controller: "BoxController"
					})
		});
})();