(function(){
    angular
        .module("SheetEditorApp")
        .factory("SheetService", SheetService);

    function SheetService($http, $q) {

        var sheets = [
            {label: "Sheet 1"},
            {label: "Sheet 2"},
            {label: "Sheet 3"}
        ];

        var api = {
            getAllSheets: getAllSheets
        };
        return api;

        function getAllSheets() {
            var deferred = $q.defer();

            $http.get("/api/ds/ss/sheet")
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();