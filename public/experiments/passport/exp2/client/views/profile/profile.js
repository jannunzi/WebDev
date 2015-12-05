(function()
{
    angular
        .module("WhiteBoardApp")
        .controller('ProfileCtrl', ProfileCtrl);
    
    function ProfileCtrl($scope, $http)
    {
        $scope.update = function(user)
        {
            $http.put('/api/experiments/passport/exp2/user/'+user._id, user)
            .success(function(users)
            {
                $scope.users = users; 
            });
        }
    }  
})();
