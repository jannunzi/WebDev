(function(){
    angular
        .module("SheetApp")
        .factory("SheetService", SheetService);

    function SheetService($http, $q) {
        var api = {
            createSheet: createSheet,
            readAllSheet: readAllSheet,
            readOneSheet: readOneSheet,
            updateSheet: updateSheet,
            deleteSheet: deleteSheet
        };
        return api;

        function createSheet(sheet) {
            var deferred = $q.defer();

            $http.post("/experiments/mongodb/ss/sheet", sheet)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function readAllSheet() {
            var deferred = $q.defer();

            $http.get("/experiments/mongodb/ss/sheet")
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function readOneSheet(id) {
            var deferred = $q.defer();

            $http.get("/experiments/mongodb/ss/sheet/" + id)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateSheet(id, sheet) {
            var deferred = $q.defer();

            $http.put("/experiments/mongodb/ss/sheet/" + id, sheet)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteSheet(id) {
            var deferred = $q.defer();

            $http.delete("/experiments/mongodb/ss/sheet/" + id)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();