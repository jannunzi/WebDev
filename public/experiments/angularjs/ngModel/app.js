(function(){
    angular
        .module("WhiteBoardApp", [])
        .controller("NgModelController", NgModelController);

    function NgModelController($scope) {

        $scope.lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

        $scope.setAuthor = setAuthor;

        function setAuthor(author) {
            $scope.theAuthor = author;
        }
    }
})();
