(function(){
    angular
        .module("WhiteBoardApp", [])
        .controller("NgClickController", NgClickController);

    function NgClickController($scope) {

        $scope.setLorem = function() {
            $scope.lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
        }

        $scope.add = addIntegers;

        function addIntegers(a, b) {
            $scope.result = a + b;
        }
    }
})();
