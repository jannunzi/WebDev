(function(){
  angular
    .module("WhiteBoardApp", ["ngRoute"])
    .controller("MainController", MainController)
    .controller("RegisterController", RegisterController)
    .config(Config);
    
    function Config($routeProvider)
    {
      $routeProvider
        .when("/home", { templateUrl: "home/home.view.html" })
        .when("/register", {
          templateUrl: "register/register.view.html",
          controller: "RegisterController"
        })
        .when("/login", { templateUrl: "login/login.view.html" })
        .when("/profile", { templateUrl: "profile/profile.view.html" })
    }
    
    function RegisterController($scope)
    {
      
    }
    
    function MainController($scope, $location)
    {
      $scope.$location = $location;
      console.log($location.path())
    }
    
})();