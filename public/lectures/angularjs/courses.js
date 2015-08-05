(function()
{
	angular
		.module("WhiteBoardApp", [])
		.controller("CoursesController", CoursesController);
		
	function CoursesController($scope)
	{
		$scope.addCourse = addCourse;
		$scope.removeCourse = removeCourse;
		$scope.selectCourse = selectCourse;
		$scope.updateCourse = updateCourse;
		
		function updateCourse(course)
		{
			$scope.courses[$scope.selectedCourseIndex].title = course.title;
			$scope.courses[$scope.selectedCourseIndex].seats = course.seats;
			$scope.courses[$scope.selectedCourseIndex].start = course.start;
		}
		
		function selectCourse(index)
		{
			$scope.selectedCourseIndex = index;
			$scope.newCourse = {
				title: $scope.courses[index].title,
				seats: $scope.courses[index].seats,
				start: $scope.courses[index].start
			};
		}
		
		function removeCourse(course)
		{			
			var index = $scope.courses.indexOf(course);
			$scope.courses.splice(index, 1);
		}
		
		function addCourse(course)
		{
			var newCourse = {
				title: course.title,
				seats: course.seats,
				start: course.start
			};
			
			$scope.courses.push(newCourse);
		}
		
		$scope.hello = "Hello from CoursesController";
		
		var java101 = {
			title: "Java 101",
			seats: 25,
			start: new Date(2015,9,4)
		};
		
		$scope.javaCourse = java101;
		
		var courses = [
			java101,
			{title: "MEAN", seats: 35, start: new Date()},
			{title: "C#", seats: 45, start: new Date(2016, 1, 15)}
		];
		
		$scope.courses = courses;
	}
})();
