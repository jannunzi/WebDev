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
            createCourse: createCourse,
            deleteCourseById: deleteCourseById,
            findCourseById: findCourseById,
            findAllCourses: findAllCourses,
            findAllCoursesForUser: findAllCoursesForUser,
            findCourseByUserId: findCourseByUserId,
            findCourseByTitle: findCourseByTitle,
            getCurrentCourse: getCurrentCourse,
            setCurrentCourse: setCurrentCourse,
            updateCourseById: updateCourseById,
            addModuleToCourse: addModuleToCourse,
            deleteModuleFromCourse: deleteModuleFromCourse,
            searchModuleInCourse: searchModuleInCourse,
            updateModulesByCourseId: updateModulesByCourseId,
            registerUserToCourse: registerUserToCourse,
            deregisterUserFromCourse: deregisterUserFromCourse,
            getCourseByNumber: getCourseByNumber
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

        function findCourseByTitle(title) {
            for (var u in model.courses) {
                if (model.courses[u].title === title) {
                    return model.courses[u];
                }
            }
            return null;
        }

        function findCourseByUserId(courseId, callback) {
            var course = null;
            for (var u in model.courses) {
                if (model.courses[u].title === courseId) {
                    course = model.courses[u];
                    break;
                }
            }
            callback(course);
        }

        function findAllCourses() {
            return $http.get("/api/ds/catalog/course");
        }

        function findAllCoursesForUser(courseIds, callback) {
            var courses = [];
            for (var u in model.courses) {
                for (var id in courseIds) {
                    if (model.courses[u].number === courseIds[id]) {
                        courses.push(model.courses[u]);
                    }
                }
            }
            callback(courses);
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
    }
}());