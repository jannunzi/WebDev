/**
 * Created by ameyapandilwar on 3/5/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .controller("ModuleController", ModuleController)

    function ModuleController($scope, $rootScope, $location, CourseService) {
        var selectedCourse = CourseService.getCurrentCourse();
        $scope.course = selectedCourse;

        $scope.addModule = addModule;
        $scope.deleteModule = deleteModule;
        $scope.selectModule = selectModule;
        $scope.updateModule = updateModule;
        $scope.searchModule = searchModule;
        $scope.viewModule = viewModule;

        function selectModule(index) {
            selectedCourse = $scope.courses[index];
            $scope.number = selectedCourse.number;
            $scope.timing = selectedCourse.timing;
            $scope.location = selectedCourse.location;
        }

        function viewModule(index) {
            var selectedModule = selectedCourse.modules[index];
            $rootScope.selectedModule = selectedModule;
            $location.url("/module/" + selectedModule);
        }

        function addModule(){
            CourseService.addModuleToCourse(selectedCourse._id).then(function(response) {
                $rootScope.currentCourse = response.data;
            });
        }

        function updateModule() {
            if (selectedCourse) {
                selectedCourse.number = $scope.number;
                selectedCourse.timing = $scope.timing;
                selectedCourse.location = $scope.location;
                CourseService.updateCourseById(selectedCourse._id, selectedCourse, function(callback) {
                    $scope.number = "";
                    $scope.timing = "";
                    $scope.location = "";
                });
            }
        }

        function deleteModule(index) {
            CourseService.deleteModuleFromCourse(selectedCourse._id, index).then(function(response) {
                $rootScope.currentCourse = response.data;
            });
        }

        function searchModule() {
            var moduleId = $scope.search;
            CourseService.searchModuleInCourse(selectedCourse._id, moduleId).then(function(response) {
                $scope.moduleSearchResult = response.data;
            });
        }
    }
}());
