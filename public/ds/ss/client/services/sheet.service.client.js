(function(){
    angular
        .module("SheetEditorApp")
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

            $http.post("/ds/ss/sheet", sheet)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function readAllSheet() {
            var deferred = $q.defer();

            $http.get("/ds/ss/sheet")
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function readOneSheet(id) {
            var deferred = $q.defer();

            $http.get("/ds/ss/sheet/" + id)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateSheet(id, sheet) {
            var deferred = $q.defer();

            $http.put("/ds/ss/sheet/" + id, sheet)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteSheet(id) {
            var deferred = $q.defer();

            $http.delete("/ds/ss/sheet/" + id)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();
//(function(){
//    angular
//        .module("SheetEditorApp")
//        .factory("SheetService", SheetService);
//
//    function SheetService($http, $q) {
//
//        var sheets = [
//            {label: "Sheet 1"},
//            {label: "Sheet 2"},
//            {label: "Sheet 3"}
//        ];
//
//        var api = {
//            getAllSheets: getAllSheets
//        };
//        return api;
//
//        function getAllSheets() {
//            var deferred = $q.defer();
//
//            $http.get("/api/ds/ss/sheet")
//                .success(function(response){
//                    deferred.resolve(response);
//                });
//
//            return deferred.promise;
//        }
//    }
//})();