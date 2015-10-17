(function(){
    angular
        .module("WhiteBoardApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();