(function(){
    angular
        .module("TestApp")
        .controller("MainController", MainController);

    function MainController($scope) {
        $scope.hello = "Hello From Main Controller";
        $scope.person = {
            firstName: "Alice",
            lastName: "Wonderland"
        };
    }
})();