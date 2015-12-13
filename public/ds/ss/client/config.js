(function(){
    angular
        .module("SheetEditorApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/sheet", {
                templateUrl: "sheet/sheet.list.view.html",
                controller: "SheetListController",
                controllerAs: "model"
            })
            .when("/sheet/:sheetId", {
                templateUrl: "sheet/sheet.details.view.html",
                controller: "SheetDetailsController",
                controllerAs: "model"
            })
            .when("/sheet/:sheetId/preview", {
                templateUrl: "sheet/sheet.details.preview.html",
                controller: "SheetDetailsController",
                controllerAs: "model"
            })
            .when("/sheet/:sheetId/:cellId", {
                templateUrl: "sheet/cell.list.view.html",
                controller: "SheetDetailsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/sheet"
            });
    }
})();