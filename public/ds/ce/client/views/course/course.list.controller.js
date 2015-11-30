
(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .controller("CourseController", CourseController);

    function CourseController ($scope, CourseService){

        $scope.courses = [];

        CourseService.getAll().then(function(res){

            console.log("request finished");
           $scope.courses = res;
        });

        $scope.update = function(){
            CourseService.updateCourses($scope.courses);
        }

        $scope.addCourse = function(){
            $scope.courses.push({
                "title": "",
                "modules": []
            });
            $scope.editingCourses = true;
        }

        $scope.addModule = function (course){
            course.modules.push({
                "title": "",
                "available": false,
                "visible": false,
                "lectures": [],
                "videos": [],
                "slides": [],
                "examples": []

            });

            $scope.editingModules = true;
        }



    }
})();