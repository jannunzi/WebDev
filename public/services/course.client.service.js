(function(){
    angular
        .module("WhiteBoardApp")
        .factory("CourseService",CourseService);

    function CourseService($http, $q) {

        var api = {
            createCourse: createCourse,
            getAllCourses: getAllCourses,
            getCoursesForUserId: getCoursesForUserId,
            getCourseById: getCourseById
        };
        return api;

        function getCourseById(courseId) {
            var deferred = $q.defer();

            $http.get("/api/portal/course/"+courseId)
                .then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function getCoursesForUserId(userId) {
            var deferred = $q.defer();

            $http.get("/api/portal/course?userId="+userId)
                .then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function getAllCourses() {
            var deferred = $q.defer();

            $http.get("/api/portal/course")
                .then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function createCourse(course) {
            var deferred = $q.defer();

            $http.post("/api/portal/course", course)
                .then(
                function(response) {
                    deferred.resolve(response);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

    }
})();