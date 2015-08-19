(function()
{
  angular
    .module("WhiteBoardApp",["ngRoute"])
    .config(Config);
  function Config($routeProvider)
  {
    $routeProvider
      .when("/home",
      {
        templateUrl: "home.html"
      })
      .otherwise({
        redirectTo: "rew.html"
      })
  }
})();
