/**
 * Created by shivastuti on 12/14/2015.
 */
(function() {
    angular
        .module("PageEditorApp")
        .controller("PagePreviewController", PagePreviewController);

    function PagePreviewController(PageService, $routeParams) {
        var pageId = $routeParams["pageId"];

        var model = this;
        model.addContent = addContent;
        model.removeContent = removeContent;


        function init() {
            PageService
                .getPageById(pageId)
                .then(function (page) {
                    model.page = page;
                    console.log(model.page.content)
                });
        }

        init();
        function addContent(contentType) {
            console.log(contentType)



            PageService

                .addContent(model.page._id, contentType)
                .then(function (page) {
                    model.page = page;
                    console.log(page);
                });

        }



        function removeContent(content) {
            var contentIndex = model.page.content.indexOf(content);
            console.log(contentIndex);
            PageService
                .removeContent(model.page._id, contentIndex)
                .then(function(page){
                    model.page = page;
                });
        }
    }
})();