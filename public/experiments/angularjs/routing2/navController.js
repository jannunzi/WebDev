(function()
{
  angular
    .module("WhiteBoardApp")
    .controller("NavController", navController);
    
  function navController($scope, $location)
  {
    $scope.$location = $location;
    console.log($location.url());
  }
})();