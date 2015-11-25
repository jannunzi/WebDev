
(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .controller("CourseController", CourseController);

    function CourseController ($scope, CourseService){

        CourseService.getAll().then(function(res){
            console.log(res);
            $scope.courses = res;
        });

        $scope.update = function(){
            CourseService.updateCourses($scope.courses);
        }


    }
})();