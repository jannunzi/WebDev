(function(){
    angular
        .module("WhiteBoardApp")
        .controller("AdminController", AdminController);
    function AdminController($scope) {
        $scope.adminHello = "Hello from AdminController"
    }
})();