/**
 * Created by ameyapandilwar on 3/5/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("ModuleController", ModuleController)

    function ModuleController($scope, $rootScope, $location, ngDialog, CourseService, ModuleService) {
        var vm = this;
        var selectedCourse = CourseService.getCurrentCourse();
        vm.course = selectedCourse;

        vm.addModule = addModule;
        vm.deleteModule = deleteModule;
        vm.editModule = editModule;
        vm.selectModule = selectModule;
        vm.updateModule = updateModule;
        vm.searchModule = searchModule;
        vm.viewModule = viewModule;

        function selectModule(index) {
            selectedCourse = vm.courses[index];
            vm.number = selectedCourse.number;
            vm.timing = selectedCourse.timing;
            vm.location = selectedCourse.location;
        }

        function viewModule(index) {
            var selectedModule = selectedCourse.modules[index];
            ModuleService.setCurrentModule(selectedModule);
            $location.url("/course/" + selectedCourse.number + "/module/" + selectedModule.number);
        }

        function addModule() {
            var number = selectedCourse.modules.length > 0 ? selectedCourse.modules[selectedCourse.modules.length - 1].number + 1 : 1;
            var module = {"number": number, "title": Date.now(), "description": ""}
            CourseService.addModuleToCourse(selectedCourse._id, module).then(function(response) {
                $rootScope.currentCourse.modules = response.data;
                vm.course.modules = $rootScope.currentCourse.modules;
            });
        }

        function editModule(index){
            vm.addingType = "module";
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

                CourseService.updateModulesByCourseId(selectedCourse._id, vm.course.modules).then(function(response) {
                    vm.course.modules = response.data;
                });
            });
            vm.module = null;
        }

        function showUpdateDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'views/modules/update.html', scope: $scope}).then(confirm, cancel);
        }

        function updateModule() {
            if (selectedCourse) {
                selectedCourse.number = vm.number;
                selectedCourse.timing = vm.timing;
                selectedCourse.location = vm.location;
                CourseService.updateCourseById(selectedCourse._id, selectedCourse, function(callback) {
                    vm.number = "";
                    vm.timing = "";
                    vm.location = "";
                });
            }
        }

        function deleteModule(index) {
            CourseService.deleteModuleFromCourse(selectedCourse._id, selectedCourse.modules[index]._id).then(function(response) {
                $rootScope.currentCourse.modules = response.data;
                vm.course.modules = $rootScope.currentCourse.modules;
            });
        }

        function searchModule() {
            var moduleId = vm.search;
            CourseService.searchModuleInCourse(selectedCourse._id, moduleId).then(function(response) {
                vm.moduleSearchResult = response.data;
            });
        }
    }
}());
