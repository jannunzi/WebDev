/**
 * Created by ameyapandilwar on 3/10/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .factory("CourseService", CourseService);

    function CourseService($rootScope, $http) {
        var service = {
            findAllCourses: findAllCourses,
            findCourseById: findCourseById,
            getCourseByNumber: getCourseByNumber,

            createCourse: createCourse,
            deleteCourseById: deleteCourseById,
            updateCourseById: updateCourseById,

            addModuleToCourse: addModuleToCourse,
            deleteModuleFromCourse: deleteModuleFromCourse,
            searchModuleInCourse: searchModuleInCourse,
            updateModulesByCourseId: updateModulesByCourseId,

            registerUserToCourse: registerUserToCourse,
            deregisterUserFromCourse: deregisterUserFromCourse,
            getCurrentCourse: getCurrentCourse,
            setCurrentCourse: setCurrentCourse,

            addAssignment: addAssignment,
            removeAssignment: removeAssignment,
            updateAssignment: updateAssignment,

            addLecture: addLecture,
            removeLecture: removeLecture,
            updateLecture: updateLecture,

            addLearningElement: addLearningElement,
            removeLearningElement: removeLearningElement,
            updateLearningElement: updateLearningElement,

            addExample: addExample,
            removeExample: removeExample,
            updateExample: updateExample,

            addDemo: addDemo,
            removeDemo: removeDemo,
            updateDemo: updateDemo,

            addDependency: addDependency,
            removeDependency: removeDependency,
            updateDependency: updateDependency
        };

        return service;

        function getCourseByNumber(courseNumber) {
            return $http.get('/api/ds/catalog/course/' + courseNumber);
        }

        function addModuleToCourse(courseId, module) {
            return $http.post('/api/ds/catalog/course/' + courseId + '/module', module);
        }

        function findCourseById(courseId) {
            return $http.get('/api/ds/catalog/course/' + courseId + '/module');
        }

        function deleteModuleFromCourse(courseId, moduleId) {
            return $http.put('/api/ds/catalog/course/' + courseId + '/module/' + moduleId);
        }

        function searchModuleInCourse(courseId, moduleId) {
            return $http.get('/api/ds/catalog/course/' + courseId + '/module/' + moduleId);
        }

        function updateModulesByCourseId(courseId, modules) {
            return $http.put('/api/ds/catalog/course/' + courseId + '/module', modules);
        }

        function findAllCourses() {
            return $http.get("/api/ds/catalog/course");
        }

        function createCourse(course) {
            return $http.post('/api/ds/catalog/course', course);
        }

        function deleteCourseById(courseId) {
            return $http.delete('/api/ds/catalog/course/' + courseId);
        }

        function updateCourseById(courseId, course) {
            return $http.put('/api/ds/catalog/course/' + courseId, course);
        }

        function getCurrentCourse() {
            return $rootScope.currentCourse;
        }

        function setCurrentCourse(course) {
            $rootScope.currentCourse = course;
        }

        function registerUserToCourse(username, courseId) {
            return $http.put('/api/ds/catalog/course/' + courseId + '/register/' + username);
        }

        function deregisterUserFromCourse(username, courseId) {
            return $http.put('/api/ds/catalog/course/' + courseId + '/deregister/' + username);
        }

        function addAssignment(courseId, moduleId, assignment) {
            return $http.post("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/assignment", assignment);
        }

        function removeAssignment(courseId, moduleId, assignmentId) {
            return $http.delete("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/assignment/" + assignmentId);
        }

        function updateAssignment(courseId, moduleId, assignmentId, assignment) {
            return $http.put("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/assignment/" + assignmentId, assignment);
        }

        function addExample(courseId, moduleId, example) {
            return $http.post("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/example", example);
        }

        function removeExample(courseId, moduleId, exampleId) {
            return $http.delete("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId);
        }

        function updateExample(courseId, moduleId, exampleId, example) {
            return $http.put("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId, example);
        }

        function addDemo(courseId, moduleId, exampleId, demo) {
            return $http.post("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo", demo);
        }

        function removeDemo(courseId, moduleId, exampleId, demoId) {
            return $http.delete("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo/" + demoId);
        }

        function updateDemo(courseId, moduleId, exampleId, demoId, demo) {
            return $http.put("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo/" + demoId, demo);
        }

        function addDependency(courseId, moduleId, exampleId, demoId, dependency) {
            return $http.post("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo/" + demoId + "/dependency", dependency);
        }

        function removeDependency(courseId, moduleId, exampleId, demoId, dependencyId) {
            return $http.delete("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo/" + demoId + "/dependency/" + dependencyId);
        }

        function updateDependency(courseId, moduleId, exampleId, demoId, dependencyId, dependency) {
            return $http.put("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo/" + demoId + "/dependency/" + dependencyId, dependency);
        }

        function addLecture(courseId, moduleId, lecture) {
            return $http.post("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/lecture", lecture);
        }

        function removeLecture(courseId, moduleId, lectureId) {
            return $http.delete("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/lecture/" + lectureId);
        }

        function updateLecture(courseId, moduleId, lectureId, lecture) {
            return $http.put("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/lecture/" + lectureId, lecture);
        }

        function addLearningElement(courseId, moduleId, lectureId, le) {
            return $http.post("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/lecture/" + lectureId + "/le", le);
        }

        function removeLearningElement(courseId, moduleId, lectureId, leId) {
            return $http.delete("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/lecture/" + lectureId + "/le/" + leId);
        }

        function updateLearningElement(courseId, moduleId, lectureId, leId, le) {
            return $http.put("/api/ds/catalog/course/" + courseId + "/module/" + moduleId + "/lecture/" + lectureId + "/le/" + leId, le);
        }
    }
}());