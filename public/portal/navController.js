(function(){
  angular
    .module("WhiteBoardApp")
    .controller("NavController", NavController);
    
  function NavController($location, $routeParams)
  {
    var vm = this;
    vm.course = angular.courses[0];

    var url = $location.url();
    
    console.log(url);
    console.log($routeParams);
  }
})();