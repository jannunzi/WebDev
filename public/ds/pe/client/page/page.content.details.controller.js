(function(){
    angular
        .module("PageEditorApp")
        .controller("PageContentEditorController", PageContentEditorController);

    function PageContentEditorController(PageService, $routeParams, $location) {
        var pageId = $routeParams["pageId"];
        var contentIndex = $routeParams["index"];

        var model = this;
        model.saveContent = saveContent;

        function init() {
            PageService
                .getPageById(pageId)
                .then(function(page){
                    model.page = page;
                    model.content = model.page.content[contentIndex];
                });
        }
        init();

        function saveContent(content) {
            $location.url("/page/"+pageId+"/details");
            PageService
                .saveContent(pageId, contentIndex, content)
                .then(function(){
                    $location.url("/page/"+pageId+"/details");
                });
        }
    }
})();