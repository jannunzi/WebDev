(function(){
    "use strict";
    angular.module("CourseEditorApp")
        .factory("CourseService", CourseService);

    function CourseService($http, $q){

        var service = {
            getAll: getAll,
            updateCourses: updateCourses
        }

        return service;

        function updateCourses(courses){
            var deferred = $q.defer();
            $http.put("/api/course", courses).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }

        function getAll(){
            var deferred = $q.defer();
            $http.get("/api/course").success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

    }
})();