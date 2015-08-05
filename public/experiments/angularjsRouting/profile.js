(function()
{
  angular
    .module("WhiteBoardApp")
    .controller("profileController", profileController);
    
  function profileController($scope, $routeParams, UserService)
  {
    $scope.id = $routeParams.id;
    $scope.user = UserService.findUserById($routeParams.id);
  }
})();