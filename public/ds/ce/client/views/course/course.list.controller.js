
(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .controller("CourseController", CourseController);

    function CourseController ($scope, ngDialog, CourseService){

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
            model.addingType = "course";
            showDialog(function(name){

                var course = {
                    "title": name,
                    "modules": []
                };

                model.courses.push(course);
                course.open = true;
            });
        }

        model.addModule = function (course){
            model.addingType = "module";

            showDialog(function(name){
                var module = {
                    "title": name,
                    "available": false,
                    "visible": false,
                    "lectures": [],
                    "videos": [],
                    "slides": [],
                    "examples": []

                };
                course.modules.push(module);
                module.open = true;
            });

        }

        model.addLecture = function(module){
            model.addingType = "lecture";

            showDialog(function(name){
                var lecture = {
                    "title": name
                };
                module.lectures.push(lecture);

                lecture = true;
            });
        }

        model.addSlide = function(module){
            model.addingType = "slides";

            showDialog(function(name){
                var slide = {
                    "title": name
                };
                module.slides.push(slide);

                slide.open = true;
            });
        }

        model.addVideo = function(module){
            model.addingType = "video";

            showDialog(function(name){
                var video = {
                    "title": name,
                    "base": "",
                    "src": ""
                };

                module.videos.push(video);

                video.open = true;

            });
        }

        model.addExample = function(module){

            model.addingType = "example";

            showDialog(function(name){
                var example = {
                    "title": name,
                    "demos": []
                };

                module.examples.push(example);

                example.open = true;

            });
        }

        model.addDemo = function(example){

            model.addingType = "demo";

            showDialog(function(name){
                var demo = {
                    "title": name,
                    "base": "",
                    "src": "",
                    "dependencies": []
                };

                example.demos.push(demo);

                demo.open = true;
            });
        }

        model.addDependency = function(demo){

            model.addingType = "dependency";

            showDialog(function(name){
                var dependency = {
                    "title": name,
                    "src": ""
                };

                demo.dependencies.push(dependency);

                dependency.open = true;
            });
        }

        model.addAssignment = function(module){

            model.addingType = "assignment";

            showDialog(function(name){
                var assignment = {
                    "title": name
                };

                module.assignments.push(assignment);

                assignment.open = true;
            })
        }

        function showDialog(confirm, cancel){

            ngDialog.openConfirm({template: 'views/course/add.html',
                scope: $scope //Pass the scope object if you need to access in the template
            }).then(confirm,
            cancel);

        }



    }
})();