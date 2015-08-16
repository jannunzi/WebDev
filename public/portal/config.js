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
      .when("/course/syllabus", {
        templateUrl: "/portal/course/syllabus.view.html"
      })
      .when("/course/agenda", {
        templateUrl: "/portal/course/agenda.view.html"
      })
      .otherwise({
        redirectTo: "/modules/0"
      });
    }
})();