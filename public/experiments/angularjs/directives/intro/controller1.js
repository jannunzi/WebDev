(function(){
    angular
        .module("IntroApp")
        .controller("Controller1", Controller1);

    function Controller1($scope) {
        $scope.hello = "Hello from controller 1";
        $scope.users = [
            {first: "Alice", last: "Wonderland"},
            {first: "Bob", last: "Marley"},
            {first: "Charlie", last: "Garcia"}
        ];
    }
})();