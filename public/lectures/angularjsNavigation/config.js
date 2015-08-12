(function()
{
	angular
		.module("WhiteBoardApp")
		.config(Configuration);
		
	function Configuration($routeProvider)
	{
		$routeProvider
			.when("/home",{
				templateUrl:"home/home.html",
				controller: "HomeController"
			})
			.when("/profile/:id",{
				templateUrl:"profile/profile.html",
				controller: "ProfileController"
			})
			.when("/users",{
				templateUrl:"users/users.html",
				controller: "UsersController"
			})
			.when("/courses",{
				templateUrl:"courses/courses.html",
				controller: "CoursesController"
			})
			.otherwise({redirectTo: "home"})
	}
})();