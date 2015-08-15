(function(){
  angular
    .module("WhiteBoardApp")
    .config(Config);
  
  function Config($routeProvider)
  {
    $routeProvider
      .when("/modules/:index", {
        templateUrl: "/portal/module/module.view.html"
        , controller: "ModuleController as controller"
      })
      .when("/modules/:index/overview", {
        templateUrl: "/portal/module/module.view.html"
        , controller: "ModuleController as controller"
      })
      .when("/modules/:index/:tabName", {
        templateUrl: "/portal/module/module.view.html"
        , controller: "ModuleController as controller"
      })
      .when("/modules/:index/:tabName/:pillIndex", {
        templateUrl: "/portal/module/module.view.html"
        , controller: "ModuleController as controller"
      })
      .when("/course/sillabus", {
        templateUrl: "/portal/course/sillabus.view.html"
      })
      .otherwise({
        redirectTo: "/modules/0"
      });
    }
})();