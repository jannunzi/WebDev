(function () {
    angular
        .module('app')
        .factory('CourseService', function ($http) {

            var findAllCourses;

            return {
                findAllCourses: findAllCourses
            };

            function findAllCourses(callback) {
                $http
                    .get('/course')
                    .success(callback);
            }
        });
})();
