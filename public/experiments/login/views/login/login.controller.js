(function(){
    angular
        .module("LoginExample")
        .controller("LoginController", loginController);

    function loginController($location, $scope) {
        $scope.$location = $location;
    }
})();