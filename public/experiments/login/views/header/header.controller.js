(function(){
    angular
        .module("LoginExample")
        .controller("HeaderController", headerController);

    function headerController($location, $scope) {
        $scope.$location = $location;
    }
})();