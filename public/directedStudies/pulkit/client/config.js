(function(){
    angular
        .module("ScriptEditorFCApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/script", {
                templateUrl: 'scripts/scriptList.html',
                controller: "ScriptListController",
                controllerAs: "model"
            })
            .when("/script/:scriptId", {
                templateUrl: 'scripts/scriptDetails.html'
            })
            .otherwise({
                redirectTo: "script"
            });
    }
})();