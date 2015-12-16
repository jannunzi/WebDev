(function(){
    angular
        .module("IntroApp")
        .controller("Controller2", Controller2);

    function Controller2($scope) {
        $scope.hello = "Hello from controller 2";
    }
})();