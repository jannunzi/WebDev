
(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .controller("CourseController", CourseController);

    function CourseController (CourseService){

        var model = this;

        model.courses = [];
        model.editingModules = false;
        model.editingAssignments = false;
        model.editingVideos = false;
        model.editingCourses = false;
        model.editingExamples = false;
        model.editingDemos = false;
        model.editingSlides = false;
        model.editingDependencies = false;

        CourseService.getAll().then(function(res){
           model.courses = res;

        });

        model.update = function(){
            CourseService.updateCourses(model.courses).then(function(res){
                model.courses = res;
            });
        }

        model.addCourse = function(){
            model.courses.push({
                "title": "",
                "modules": []
            });
            model.editingCourses = true;
        }

        model.addModule = function (course){
            course.modules.push({
                "title": "",
                "available": false,
                "visible": false,
                "lectures": [],
                "videos": [],
                "slides": [],
                "examples": []

            });

            model.editingModules = true;
        }

        model.addLecture = function(module){

            module.lectures.push({
                "title": ""
            });
            model.editingLectures = true;
        }

        model.addSlide = function(module){
            module.slides.push({
                "title":""
            });
            model.editingSlides = true;
        }

        model.addVideo = function(module){
            module.videos.push({
                "title": "",
                "base": "",
                "src": ""
            });

            model.editingVideos = true;
        }

        model.addExample = function(module){
            module.examples.push({
                "title": "",
                "demos": []
            });

            model.editingExamples = true;
        }

        model.addDemo = function(example){

            example.demos.push({
                "title": "",
                "base": "",
                "src": "",
                "dependencies": []
            });

            model.editingDemos = true;
        }

        model.addDependency = function(demo){
            demo.dependencies.push({
                "title": "",
                "src": ""
            });

            model.editingDependencies = true;
        }

        model.addAssignment = function(module){
            module.assignments.push({
                "title": ""
            });

            model.editingAssignments = true;
        }



    }
})();