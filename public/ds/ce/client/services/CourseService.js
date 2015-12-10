(function(){
    "use strict";
    angular.module("CourseEditorApp")
        .factory("CourseService", CourseService);

    function CourseService($http, $q){

        var service = {
            getAll: getAll,
            updateCourses: updateCourses,
            addCourse: addCourse,
            removeCourse: removeCourse
        }

        return service;

        function updateCourses(courses){
            var deferred = $q.defer();
            $http.put("/api/ds/ce/course", courses).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }

        function getAll(){
            var deferred = $q.defer();
            $http.get("/api/ds/ce/course").success(function(response){
                console.log("got courses");
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function addCourse(course){
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course", course).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function removeCourse(id){
            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + id).success(function(res){
                if(res.ok==1){
                    $http.get("/api/ds/ce/course").success(function(courses){
                        deferred.resolve(courses);
                    });
                }
            });
            return deferred.promise;
        }

    }
})();