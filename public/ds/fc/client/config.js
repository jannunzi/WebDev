(function(){
    angular
        .module("ScriptEditorFCApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/script", {
                templateUrl: 'scripts/script.list.view.html',
                controller: "ScriptListController",
                controllerAs: "model"
            })
            .when("/script/:scriptId", {
                templateUrl: 'scripts/script.details.view.html',
                controller: "ScriptDetailsController",
                controllerAs: "model"
            })
            .when("/script/:scriptId/statement/:statementIndex",{
                templateUrl: 'statements/statement.details.view.html'
            })
            .otherwise({
                redirectTo: "script"
            });
    }
})();