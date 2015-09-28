(function()
{
  angular
    .module("WhiteBoardApp")
    .config(Config);
    
  function Config($routeProvider)
  {
    $routeProvider
      .when("/home",
      {
        templateUrl: "home.html"
      })
      .when("/users",
      {
        templateUrl: "users.html",
        controller: "UserController"
      })
      .when("/profile/:id",
      {
        templateUrl: "profile.html",
        controller: "profileController"
      })
      .when("/courses",
      {
        templateUrl: "courses.html"
      })
      .otherwise({
        redirectTo: "home"
      })
  }
})();