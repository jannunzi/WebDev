/**
 * Created by ameyapandilwar on 3/5/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("ModuleController", ModuleController)
        .filter("trustUrl", trustUrl)

    function trustUrl($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }

    function ModuleController($scope, $rootScope, $location, ngDialog, CourseService, ModuleService, $routeParams, $sce) {
        var vm = this;

        vm.addModule = addModule;
        vm.deleteModule = deleteModule;
        vm.editModule = editModule;
        vm.selectModule = selectModule;
        vm.updateModule = updateModule;
        vm.searchModule = searchModule;
        vm.viewModule = viewModule;

        vm.addLecture = addLecture;
        vm.deleteLecture = deleteLecture;
        vm.editLecture = editLecture;
        vm.viewLecture = viewLecture;

        vm.addExample = addExample;
        vm.deleteExample = deleteExample;
        vm.editExample = editExample;
        vm.viewExample = viewExample;

        vm.addAssignment = addAssignment;
        vm.deleteAssignment = deleteAssignment;
        vm.editAssignment = editAssignment;
        vm.viewAssignment = viewAssignment;

        vm.addLearningElement = addLearningElement;
        vm.deleteLearningElement = deleteLearningElement;
        vm.editLearningElement = editLearningElement;

        vm.addDemo = addDemo;
        vm.deleteDemo = deleteDemo;
        vm.editDemo = editDemo;

        vm.addDependency = addDependency;
        vm.deleteDependency = deleteDependency;
        vm.editDependency = editDependency;

        vm.viewOverview = viewOverview;
        vm.renderHtml = renderHtml;

        vm.tinymceOptions = {
            plugins: "link image",
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist'
        };

        var courseId = $routeParams.courseId;
        var moduleId = $routeParams.moduleId;

        if (courseId && moduleId) {
            CourseService.getCourseByNumber(courseId).then(function(response) {
                vm.course = response.data;
                CourseService.setCurrentCourse(vm.course);

                ModuleService.getModuleByNumber(courseId, moduleId).then(function(response) {
                    ModuleService.setCurrentModule(response.data);
                });
            });
        } else if (courseId) {
            CourseService.getCourseByNumber(courseId).then(function(response) {
                vm.course = response.data;
                CourseService.setCurrentCourse(vm.course);
            });
        }

        vm.course = CourseService.getCurrentCourse();

        vm.lecture = ModuleService.getCurrentLecture();
        vm.example = ModuleService.getCurrentExample();
        vm.assignment = ModuleService.getCurrentAssignment();

        // Module

        function selectModule(index) {
            vm.course = vm.courses[index];
            vm.number = vm.course.number;
            vm.timing = vm.course.timing;
            vm.location = vm.course.location;
        }

        function viewModule(index) {
            var selectedModule = vm.course.modules[index];
            ModuleService.setCurrentModule(selectedModule);
            $location.url("/course/" + vm.course.number + "/module/" + selectedModule.number);
        }

        function addModule() {
            var number = vm.course.modules.length > 0 ? vm.course.modules[vm.course.modules.length - 1].number + 1 : 1;
            vm.element = "module";

            showAddDialog(function(model) {
                var module = {
                    "number": number,
                    "title": model.title,
                    "description": model.description
                };

                vm.course.modules.push(module);

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                    CourseService.setCurrentCourse(vm.course);
                });
                model.title = "";
                model.description = "";
            });
        }

        function editModule(index){
            vm.element = "module";
            vm.currentModule = vm.course.modules[index];

            showUpdateDialog(function(model){
                var selectedModule = vm.currentModule;
                selectedModule.title = model.title;
                selectedModule.description = model.description;

                for (var m in vm.course.modules) {
                    if (vm.course.modules[index]._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = selectedModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.module = null;
        }

        function updateModule() {
            if (vm.course) {
                vm.course.number = vm.number;
                vm.course.timing = vm.timing;
                vm.course.location = vm.location;
                CourseService.updateCourseById(vm.course._id, vm.course, function(callback) {
                    vm.number = "";
                    vm.timing = "";
                    vm.location = "";
                });
            }
        }

        function deleteModule(index) {
            CourseService.deleteModuleFromCourse(vm.course._id, vm.course.modules[index]._id).then(function(response) {
                $rootScope.currentCourse.modules = response.data;
                vm.course.modules = $rootScope.currentCourse.modules;
            });
        }

        function searchModule() {
            var moduleId = vm.search;
            CourseService.searchModuleInCourse(vm.course._id, moduleId).then(function(response) {
                vm.moduleSearchResult = response.data;
            });
        }

        // Lecture

        function addLecture() {
            var currentModule = ModuleService.getCurrentModule();
            var number = currentModule.lectures.length > 0 ? currentModule.lectures[currentModule.lectures.length - 1].number + 1 : 1;

            vm.element = "lecture";
            showAddDialog(function(model) {
                var lecture = {
                    "number": number,
                    "title": model.title,
                    "overview": model.overview,
                    "learningElements": []
                };

                currentModule.lectures.push(lecture);

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.title = "";
            vm.overview = "";
        }

        function deleteLecture(index) {
            var currentModule = ModuleService.getCurrentModule();

            currentModule.lectures.splice(index, 1);

            for (var m in vm.course.modules) {
                if (currentModule._id === vm.course.modules[m]._id) {
                    vm.course.modules[m] = currentModule;
                }
            }

            CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                vm.course.modules = response.data;
            });

            viewLecture(0);
        }

        function editLecture(index){
            var currentModule = ModuleService.getCurrentModule();
            vm.currentLecture = currentModule.lectures[index];
            vm.element = "lecture";

            showUpdateDialog(function(model){
                vm.currentLecture.title = model.title;
                vm.currentLecture.overview = model.overview;

                for (var l in currentModule.lectures) {
                    if (vm.currentLecture._id === currentModule.lectures[l]._id) {
                        currentModule.lectures[l] = vm.currentLecture;
                    }
                }

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.module = null;
        }

        function viewLecture(index) {
            var currentModule = ModuleService.getCurrentModule();
            var lectureId = 1;

            if (currentModule.lectures.length > 0) {
                vm.lecture = currentModule.lectures[index];
                lectureId = vm.lecture.number;
            } else {
                vm.lecture = null;
            }
            ModuleService.setCurrentLecture(vm.lecture);

            $location.url("/course/" + vm.course.number + "/module/" + currentModule.number + "/lecture/" + lectureId);
        }

        // Example

        function addExample() {
            var currentModule = ModuleService.getCurrentModule();
            var number = currentModule.examples.length > 0 ? currentModule.examples[currentModule.examples.length - 1].number + 1 : 1;

            vm.element = "example";
            showAddDialog(function(model) {
                var example = {
                    "number": number,
                    "title": model.title,
                    "demos": []
                };

                currentModule.examples.push(example);

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.title = "";
        }

        function deleteExample(index) {
            var currentModule = ModuleService.getCurrentModule();

            currentModule.examples.splice(index, 1);

            for (var m in vm.course.modules) {
                if (currentModule._id === vm.course.modules[m]._id) {
                    vm.course.modules[m] = currentModule;
                }
            }

            CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                vm.course.modules = response.data;
            });
        }

        function editExample(index){
            var currentModule = ModuleService.getCurrentModule();
            vm.currentExample = currentModule.examples[index];
            vm.element = "example";

            showUpdateDialog(function(model){
                vm.currentExample.title = model.title;

                for (var e in currentModule.examples) {
                    if (vm.currentExample._id === currentModule.examples[e]._id) {
                        currentModule.examples[e] = vm.currentExample;
                    }
                }

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.module = null;
        }

        function viewExample(index) {
            var currentModule = ModuleService.getCurrentModule();
            var exampleId = 1;

            if (currentModule.examples.length > 0) {
                vm.example = currentModule.examples[index];
                exampleId = vm.example.number;
            } else {
                vm.example = null;
            }
            ModuleService.setCurrentExample(vm.example);

            $location.url("/course/" + vm.course.number + "/module/" + currentModule.number + "/example/" + exampleId);
        }

        // Assignment

        function addAssignment() {
            var currentModule = ModuleService.getCurrentModule();
            var number = currentModule.assignments.length > 0 ? currentModule.assignments[currentModule.assignments.length - 1].number + 1 : 1;

            vm.element = "assignment";
            showAddDialog(function(model) {
                var assignment = {
                    "number": number,
                    "title": model.title,
                    "src": model.src
                };

                currentModule.assignments.push(assignment);

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.title = "";
            vm.src = "";
        }

        function deleteAssignment(index) {
            var currentModule = ModuleService.getCurrentModule();

            currentModule.assignments.splice(index, 1);

            for (var m in vm.course.modules) {
                if (currentModule._id === vm.course.modules[m]._id) {
                    vm.course.modules[m] = currentModule;
                }
            }

            CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                vm.course.modules = response.data;
            });
        }

        function editAssignment(index){
            var currentModule = ModuleService.getCurrentModule();
            vm.currentAssignment = currentModule.assignments[index];
            vm.element = "assignment";

            showUpdateDialog(function(model){
                vm.currentAssignment.title = model.title;
                vm.currentAssignment.src = model.src;

                for (var a in currentModule.assignments) {
                    if (vm.currentAssignment._id === currentModule.currentAssignment[a]._id) {
                        currentModule.assignments[l] = vm.currentAssignment;
                    }
                }

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.module = null;
        }

        function viewAssignment(index) {
            var currentModule = ModuleService.getCurrentModule();
            var assignmentId = 1;

            if (currentModule.assignments.length > 0) {
                vm.assignment = currentModule.assignments[index];
                assignmentId = vm.assignment.number;
            } else {
                vm.assignment = null;
            }
            ModuleService.setCurrentAssignment(vm.assignment);

            $location.url("/course/" + vm.course.number + "/module/" + currentModule.number + "/assignment/" + assignmentId);
        }

        // LearningElement

        function addLearningElement(lecture) {
            var currentModule = ModuleService.getCurrentModule();

            vm.element = "learning element";
            vm.type = "PDF";
            showAddDialog(function(model) {
                var learningElement = {
                    "title": model.title,
                    "type": model.type,
                    "src": model.src,
                    "height": model.height,
                    "width": model.width,
                    "html": model.html
                };

                lecture.learningElements.push(learningElement);

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        for (var l in currentModule.lectures) {
                            if (lecture._id === currentModule.lectures[l]._id) {
                                currentModule.lectures[l] = lecture;
                            }
                        }
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                    vm.lecture = lecture;
                });
            });
            vm.title = "";
            vm.overview = "";
        }

        function deleteLearningElement(index, lecture) {
            var currentModule = ModuleService.getCurrentModule();

            lecture.learningElements.splice(index, 1);

            for (var m in vm.course.modules) {
                if (currentModule._id === vm.course.modules[m]._id) {
                    for (var l in currentModule.lectures) {
                        if (lecture._id === currentModule.lectures[l]._id) {
                            currentModule.lectures[l] = lecture;
                        }
                    }
                    vm.course.modules[m] = currentModule;
                }
            }

            CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                vm.course.modules = response.data;
                vm.lecture = lecture;
            });
        }

        function editLearningElement(index, lecture){
            var currentModule = ModuleService.getCurrentModule();
            vm.cLE = lecture.learningElements[index];
            vm.element = "learning element";

            showUpdateDialog(function(model){
                vm.cLE.title = model.title;
                vm.cLE.type = model.type;
                vm.cLE.src = model.src;

                for (var le in lecture.learningElements) {
                    if (vm.cLE._id == lecture.learningElements[le]._id) {
                        lecture.learningElements[le] = vm.cLE;
                    }
                }

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        for (var l in currentModule.lectures) {
                            if (lecture._id === currentModule.lectures[l]._id) {
                                currentModule.lectures[l] = lecture;
                            }
                        }
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                    vm.lecture = lecture;
                });
            });
            vm.module = null;
        }

        // Demo

        function addDemo(example) {
            var currentModule = ModuleService.getCurrentModule();

            vm.element = "demo";
            showAddDialog(function(model) {
                var demo = {
                    "title": model.title,
                };

                example.demos.push(demo);

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        for (var e in currentModule.examples) {
                            if (example._id === currentModule.examples[e]._id) {
                                currentModule.examples[e] = example;
                            }
                        }
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                    vm.example = example;
                });
            });
            vm.title = "";
        }

        function deleteDemo(index, example) {
            var currentModule = ModuleService.getCurrentModule();

            example.demos.splice(index, 1);

            for (var m in vm.course.modules) {
                if (currentModule._id === vm.course.modules[m]._id) {
                    for (var l in currentModule.examples) {
                        if (example._id === currentModule.examples[l]._id) {
                            currentModule.examples[l] = example;
                        }
                    }
                    vm.course.modules[m] = currentModule;
                }
            }

            CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                vm.course.modules = response.data;
                vm.example = example;
            });
        }

        function editDemo(index, example){
            var currentModule = ModuleService.getCurrentModule();
            vm.currentDemo = example.demos[index];
            vm.element = "demo";

            showUpdateDialog(function(model){
                vm.currentDemo.title = model.title;
                vm.currentDemo.base = model.base;
                vm.currentDemo.src = model.src;

                for (var d in example.demos) {
                    if (vm.currentDemo._id == example.demos[d]._id) {
                        example.demos[d] = vm.currentDemo;
                    }
                }

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        for (var e in currentModule.examples) {
                            if (example._id === currentModule.examples[e]._id) {
                                currentModule.examples[d] = example;
                            }
                        }
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                    vm.example = example;
                });
            });
            vm.module = null;
        }

        // Dependency

        function addDependency(example, demo) {
            var currentModule = ModuleService.getCurrentModule();

            vm.element = "dependency";
            showAddDialog(function(model) {
                var dependency = {
                    "src": model.src
                };

                demo.dependencies.push(dependency);

                for (var d in example.demos) {
                    if (example.demos[d]._id === demo._id) {
                        example.demos[d] = demo;
                    }
                }

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        for (var e in currentModule.examples) {
                            if (example._id === currentModule.examples[e]._id) {
                                currentModule.examples[e] = example;
                            }
                        }
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                    vm.example = example;
                });
            });
            vm.title = "";
        }

        function deleteDependency(index, example, demo) {
            var currentModule = ModuleService.getCurrentModule();

            demo.dependencies.splice(index, 1);

            for (var d in example.demos) {
                if (example.demos[d]._id === demo._id) {
                    example.demos[d] = demo;
                }
            }

            for (var m in vm.course.modules) {
                if (currentModule._id === vm.course.modules[m]._id) {
                    for (var l in currentModule.examples) {
                        if (example._id === currentModule.examples[l]._id) {
                            currentModule.examples[l] = example;
                        }
                    }
                    vm.course.modules[m] = currentModule;
                }
            }

            CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                vm.course.modules = response.data;
                vm.example = example;
            });
        }

        function editDependency(index, example, demo){
            var currentModule = ModuleService.getCurrentModule();
            vm.currentDependency = demo.dependencies[index];
            vm.element = "dependency";

            showUpdateDialog(function(model){
                vm.currentDependency.src = model.src;

                for (var dep in demo.dependencies) {
                    if (vm.currentDependency._id == demo.dependencies[dep]._id) {
                        demo.dependencies[dep] = vm.currentDependency;
                    }
                }

                for (var d in example.demos) {
                    if (example.demos[d]._id === demo._id) {
                        example.demos[d] = demo;
                    }
                }

                for (var m in vm.course.modules) {
                    if (currentModule._id === vm.course.modules[m]._id) {
                        for (var e in currentModule.examples) {
                            if (example._id === currentModule.examples[e]._id) {
                                currentModule.examples[d] = example;
                            }
                        }
                        vm.course.modules[m] = currentModule;
                    }
                }

                CourseService.updateModulesByCourseId(vm.course._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                    vm.example = example;
                });
            });
            vm.module = null;
        }

        function showAddDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'views/modules/add.html', scope: $scope}).then(confirm, cancel);
        }

        function showUpdateDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'views/modules/update.html', scope: $scope}).then(confirm, cancel);
        }

        function viewOverview() {
            var currentModule = ModuleService.getCurrentModule();
            $location.url("/course/" + vm.course.number + "/module/" + currentModule.number);
        }

        function renderHtml(text) {
            return $sce.trustAsHtml(text);
        }
    }
}());
