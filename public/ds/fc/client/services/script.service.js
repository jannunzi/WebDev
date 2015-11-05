(function(){
    angular
        .module("ScriptEditorFCApp")
        .factory("ScriptService", ScriptService);

    function ScriptService($q, $http) {

        var api = {
            getAllScripts: getAllScripts,
            getScriptById: getScriptById,
            addScript: addScript,
            removeScript: removeScript,
            addStatement: addStatement
        };
        return api;

        function addStatement(id, statement) {
            var deferred = $q.defer();

            $http.post("/api/ds/fc/script/"+id+"/statement", statement)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getScriptById(id) {
            var deferred = $q.defer();

            $http.get("/api/ds/fc/script/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
        function getAllScripts() {
            var deferred = $q.defer();

            $http.get("/api/ds/fc/script")
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function addScript(script) {
            // should go out to the Web service
            var deferred = $q.defer();

            $http.post("/api/ds/fc/script", script)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function removeScript(id) {
            // should go out to the Web service
            var deferred = $q.defer();

            $http.delete("/api/ds/fc/script/" + id)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();