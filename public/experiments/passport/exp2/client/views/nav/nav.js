(function()
{
    angular
        .module("WhiteBoardApp")
        .controller("NavCtrl", NavCtrl);
    
    function NavCtrl($scope, $http, $location, $rootScope)
    {
        $scope.logout = function()
        {
            $http.post("/api/experiments/passport/exp2/logout")
            .success(function()
            {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
        } 
    }
})();
