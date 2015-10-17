(function(){
    angular
        .module("WhiteBoardApp")
        .controller("CourseController", CourseController);

    function CourseController($scope, CourseService) {

        $scope.courses = CourseService.getAllCourses();

        $scope.removeCourse = function(index) {
            console.log(index);
            $scope.courses.splice(index, 1);
        }
    }
})();