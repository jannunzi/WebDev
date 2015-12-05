(function(){
    angular
        .module("WhiteBoardApp")
        .controller("MainController", MainController);

    function MainController($scope, UserService, $rootScope, $http, $location) {
        $rootScope.danger = null;

        var model = this;

        model.logout = logout;

        function logout()
        {
            UserService
                .logout()
                .then(function(){
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }

    }
})();