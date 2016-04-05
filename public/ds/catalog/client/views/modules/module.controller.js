/**
 * Created by ameyapandilwar on 3/5/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("ModuleController", ModuleController)

    function ModuleController($rootScope, $location, CourseService) {
        var vm = this;
        var selectedCourse = CourseService.getCurrentCourse();
        vm.course = selectedCourse;

        vm.addModule = addModule;
        vm.deleteModule = deleteModule;
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
            $rootScope.selectedModule = selectedModule;
            $location.url("/course/" + selectedCourse.number + "/module/" + selectedModule);
        }

        function addModule(){
            var module = {"title": Date.now()}
            CourseService.addModuleToCourse(selectedCourse._id, module).then(function(response) {
                $rootScope.currentCourse.modules = response.data;
                vm.course.modules = $rootScope.currentCourse.modules;
            });
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
