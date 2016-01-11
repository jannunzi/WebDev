/**
 * Created by shivastuti on 12/11/2015.
 */

(function(){
    angular
        .module("PageEditorApp")
        .controller("NewPageController", NewPageController);
  console.log("test");
    function NewPageController(PageService, $routeParams, $location, $scope) {
        var pageId = $routeParams["pageId"];
        var contentIndex = $routeParams["index"];

        $scope.displayPageDeletePopup = false;
        $scope.showDeletePagePopup = function(options, page) {
            if (options === true) {
                $scope.displayPageDeletePopup = true;
            } else {
                $scope.displayPageDeletePopup = false;
            }
            $scope.page = page;
        };

        var model               = this;

        model.deletePage        = deletePage;
        model.updatePageLabel   = updatePageLabel;
        model.updatePageTitle   = updatePageTitle;
        model.savePageContent       = savePageContent;
        console.log("before init");
        function init() {
            PageService
                .getPageById(pageId)
                .then(function(page){
                    model.page = page;
                    model.content = model.page.content[contentIndex];
                });
            console.log("inside init");
        }
        init();

        function deletePage(page)
        {
            PageService.deletePage(page)
                .then(function(pages)
                {
                    model.pages = pages;
                    window.location.href = "#/page";
                });
        }
        function savePageContent(page)
        {
            console.log("save content called from controller");
            console.log(page);

            PageService.savePageContent(page)
                .then(function(pages)
                {
                    model.pages = pages;
                    window.location.href = "#/page";
                });
        }

        function updatePageTitle(page)
        {
            PageService.updatePageTitle(page)
                .then(function(pages)
                {
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
    }
})();