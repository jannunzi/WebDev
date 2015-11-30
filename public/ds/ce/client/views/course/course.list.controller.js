
(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .controller("CourseController", CourseController);

    function CourseController ($scope, CourseService){

        $scope.courses = [];

        CourseService.getAll().then(function(res){
           $scope.courses = res;
            $scope.editingModules = false;
            $scope.editingAssignments = false;
            $scope.editingVideos = false;
            $scope.editingCourses = false;
            $scope.editingExamples = false;
            $scope.editingDemos = false;
            $scope.editingSlides = false;
            $scope.editingDependencies = false;
        });

        $scope.update = function(){
            CourseService.updateCourses($scope.courses).then(function(res){
                $scope.courses = res;
            });
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

        $scope.addLecture = function(module){

            module.lectures.push({
                "title": ""
            });
            $scope.editingLectures = true;
        }

        $scope.addSlide = function(module){
            module.slides.push({
                "title":""
            });
            $scope.editingSlides = true;
        }

        $scope.addVideo = function(module){
            module.videos.push({
                "title": "",
                "base": "",
                "src": ""
            });

            $scope.editingVideos = true;
        }

        $scope.addExample = function(module){
            module.examples.push({
                "title": "",
                "demos": []
            });

            $scope.editingExamples = true;
        }

        $scope.addDemo = function(example){

            example.demos.push({
                "title": "",
                "base": "",
                "src": "",
                "dependencies": []
            });

            $scope.editingDemos = true;
        }

        $scope.addDependency = function(demo){
            demo.dependencies.push({
                "title": "",
                "src": ""
            });

            $scope.editingDependencies = true;
        }

        $scope.addAssignment = function(module){
            module.assignments.push({
                "title": ""
            });

            $scope.editingAssignments = true;
        }



    }
})();