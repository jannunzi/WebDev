(function(){
    angular
        .module("WhiteBoardApp")
        .controller("HomeController", HomeController);
    function HomeController($scope) {
        $scope.homeHello = "Hello from HomeController"
    }
})();