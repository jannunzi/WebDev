(function(){
    angular
        .module("SheetEditorApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/sheet", {
                templateUrl: "/sheet/sheet.list.view.html",
                controller: "SheetListController",
                controllerAs: "model"
            });
    }
})();