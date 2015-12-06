(function(){
    angular
        .module("PageEditorApp")
        .controller("PageListController", PageListController);

    function PageListController(PageService, $scope) {
        var model = this;
        model.addPage         = addPage;
        model.updatePageLabel = updatePageLabel;
        model.deletePage      = deletePage;

        function init() {
            PageService
                .getAllPages()
                .then(function(pages){
                    model.pages = pages;
                });
        }
        init();

        function addPage(page) {
            PageService
                .addPage(page)
                .then(function(pages){
                    model.pages = pages;
                });
        }

        function updatePageLabel(page)
        {
            PageService.updatePageLabel(page)
            .then(function(pages)
            {
                model.pages = pages;
            });
        }

        function deletePage(page)
        {
            PageService.deletePage(page)
            .then(function(pages)
            {
                model.pages = pages;
            });
        }
    }
})();
