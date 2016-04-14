/**
 * Created by ameyapandilwar on 3/10/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .factory("ModuleService", ModuleService);

    function ModuleService($rootScope, $http) {
        var service = {
            getCurrentModule: getCurrentModule,
            setCurrentModule: setCurrentModule,
            getCurrentLecture: getCurrentLecture,
            setCurrentLecture: setCurrentLecture,
            getCurrentAssignment: getCurrentAssignment,
            setCurrentAssignment: setCurrentAssignment,
            getCurrentExample: getCurrentExample,
            setCurrentExample: setCurrentExample,
            getModuleByNumber: getModuleByNumber
        };

        return service;

        function getCurrentModule() {
            return $rootScope.currentModule;
        }

        function setCurrentModule(module) {
            $rootScope.currentModule = module;
        }

        function getCurrentLecture() {
            return $rootScope.currentLecture;
        }

        function setCurrentLecture(lecture) {
            $rootScope.currentLecture = lecture;
        }

        function getCurrentAssignment() {
            return $rootScope.currentAssignment;
        }

        function setCurrentAssignment(assignment) {
            $rootScope.currentAssignment = assignment;
        }

        function getCurrentExample() {
            return $rootScope.currentExample;
        }

        function setCurrentExample(example) {
            $rootScope.currentExample = example;
        }

        function getModuleByNumber(courseNumber, moduleNumber) {
            return $http.get('/api/ds/catalog/course/' + courseNumber + '/module/' + moduleNumber);
        }
    }
}());