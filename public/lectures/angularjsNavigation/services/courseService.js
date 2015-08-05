(function()
{
	angular
		.module("WhiteBoardApp")
		.factory("CourseService", courseService);
		
	function courseService()
	{		
		var courses = [
			{
				title: "Java 101",
				seats: 25,
				start: new Date(2015,9,4)
			},
			{title: "MEAN", seats: 35, start: new Date()},
			{title: "C#", seats: 45, start: new Date(2016, 1, 15)}
		];
		
		var service = {
			findAllCourses: findAllCourses
		};
		return service;
	
		function findAllCourses()
		{
			return courses;
		}
	}
})();
