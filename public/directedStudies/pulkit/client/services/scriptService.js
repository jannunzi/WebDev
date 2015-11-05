(function(){
    angular
        .module("ScriptEditorFCApp")
        .factory("ScriptService", ScriptService);

    function ScriptService($q, $http) {

        var scripts = [
            {"id": 1, "label": "Script 1"},
            {"id": 2, "label": "Script 2"},
            {"id": 3, "label": "Script 3"},
            {"id": 4, "label": "Script 4"},
            {"id": 5, "label": "Script 5"}
        ];

        var api = {
            getAllScripts: getAllScripts,
            addScript: addScript,
            removeScript: removeScript
        };
        return api;

        function getAllScripts() {
            //var deferred = $q.defer();
            //
            //$http.get("api/script")
            //    .success(function(response{
            //        deferred.resolve(response);
            //    }));
            //
            //return deferred.promise;

            return scripts;
        }

        function addScript(script) {
            // should go out to the Web service
            scripts.push(script);
            return scripts;
        }

        function removeScript(id) {
            // should go out to the Web service
            for(var i=0; i<scripts.length; i++) {
                if(scripts[i].id === id) {
                    scripts.splice(i, 1);
                    return scripts;
                }
            }
        }
    }
})();