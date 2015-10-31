(function(){
    angular
        .module("FilterApp")
        .factory("FilterService", FilterService);

    function FilterService($http, $q) {
        var service = {
            getAllFilters: getAllFilters,
            getAllFiltersForId: getAllFiltersForId,
            getAllFiltersForClass: getAllFiltersForClass
        };
        return service;

        function getAllFilters() {
            var deferred = $q.defer();
            $http.get("/api/experiments/express/filter/filter")
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getAllFiltersForId(id) {
            var deferred = $q.defer();
            $http.get("/api/experiments/express/filter/filter/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getAllFiltersForClass(className) {
            var deferred = $q.defer();
            $http.get("/api/experiments/express/filter/class/"+className+"/filter")
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();