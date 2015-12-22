(function(){
    angular
        .module("PageEditorApp")
        .controller("PageDetailsController", PageDetailsController);

    function PageDetailsController(PageService, $routeParams) {
        var pageId = $routeParams["pageId"];

        var model = this;
        model.addContent = addContent;
        model.removeContent = removeContent;
        model.sortContentDown      = sortContentDown;
        model.sortContentUp    = sortContentUp

        function init() {
            PageService
                .getPageById(pageId)
                .then(function(page){
                    model.page = page;
                });
        }
        init();

        function sortContentUp(index){

            if(index ==0)
            {
                return;
            }
            var temp = model.page.content[index-1];
            model.page.content[index-1] = model.page.content[index];
            model.page.content[index] = temp;

            updateContentList();

        }
        function sortContentDown(index){
            if(index == model.page.content.length-1)
            {
                return;
            }
            var temp = model.page.content[index];
            model.page.content[index] = model.page.content[index+1];
            model.page.content[index+1] = temp;

            updateContentList();

        }

        function updateContentList()
        {
            PageService.updateContentList(pageId,model.page.content);

        }
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