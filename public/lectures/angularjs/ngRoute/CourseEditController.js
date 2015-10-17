(function(){
    angular
        .module("WhiteBoardApp")
        .controller("CourseEditController", CourseEditController);

    function CourseEditController($scope, $routeParams) {
        alert($routeParams.count);
    }
})();