(function () {
    angular
        .module('app')
        .controller("NavController", NavController);

    function NavController($scope) {
        console.log("Nav");
        $scope.course = angular.courses[0];
    }
})();
