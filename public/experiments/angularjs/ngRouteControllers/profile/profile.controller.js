(function(){
    angular
        .module("WhiteBoardApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope) {
        $scope.profileHello = "Hello from ProfileController"
    }
})();