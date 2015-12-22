(function(){
    angular
        .module("PageEditorApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/page", {
                templateUrl: "page/page.list.view.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/page/:pageId/details",
            {
                templateUrl: "page/page.details.view.html",
                controller: "PageDetailsController",
                controllerAs: "model"
            })
            .when("/page/:pageId/preview",
            {
                templateUrl: "page/page.preview.view.html",
                controller: "PagePreviewController",
                controllerAs: "model"
            })

            .when("/page/:pageId/newpage",
                {
                    templateUrl: "page/page.newpage.view.html",
                    controller: "NewPageController",
                    controllerAs: "model"
                })
            .when("/page/:pageId/details/:index",
            {
                templateUrl: "page/page.content.details.view.html",
                controller: "PageContentEditorController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/page"
            });
    }
})();