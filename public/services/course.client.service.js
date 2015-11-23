(function(){
    angular
        .module("WhiteBoardApp")
        .factory("CourseService",CourseService);

    function CourseService($http, $q) {

        var api = {
            createCourse: createCourse
        };
        return api;

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