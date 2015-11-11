(function(){
    angular
        .module("PageEditorApp")
        .controller("PageContentEditorController", PageContentEditorController);

    function PageContentEditorController(PageService, $routeParams) {
        var pageId = $routeParams["pageId"];
        var contentIndex = $routeParams["index"];

        var model = this;

        function init() {
            PageService
                .getPageById(pageId)
                .then(function(page){
                    model.page = page;
                    model.content = model.page.content[contentIndex];
                });
        }
        init();
    }
})();