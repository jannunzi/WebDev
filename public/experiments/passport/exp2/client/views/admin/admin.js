(function()
{
  angular
    .module("WhiteBoardApp")
    .controller("AdminController", AdminController);
    
  function AdminController($scope, $http)
  {
    $http.get("/api/experiments/passport/exp2/user")
    .success(function(users)
    {
        $scope.users = users;
    });
    
    $scope.remove = function(user)
    {
        $http.delete('/api/experiments/passport/exp2/user/'+user._id)
        .success(function(users){
           $scope.users = users; 
        });
    }
    
    $scope.update = function(user)
    {
        $http.put('/api/experiments/passport/exp2/user/'+user._id, user)
        .success(function(users){
            $scope.users = users; 
        });
    }
    
    $scope.add = function(user)
    {
        $http.post('/api/experiments/passport/exp2/user', user)
        .success(function(users){
            $scope.users = users; 
        });
    }
    
    $scope.select = function(user)
    {
        $scope.user = user;
    }
  }
})();