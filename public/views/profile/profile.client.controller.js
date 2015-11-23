(function()
{
    angular
        .module("WhiteBoardApp")
        .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl($scope, $http, $rootScope)
    {
        $rootScope.danger = null;
        $scope.update = function(user)
        {
            $http.put('/api/portal/user/'+user._id, user)
                .success(function(users)
                {
                    $scope.users = users;
                });
        }
    }
})();
