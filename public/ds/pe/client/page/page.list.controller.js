(function(){
    angular
        .module("PageEditorApp")
        .controller("PageListController", PageListController);

    function PageListController(PageService, $scope) {
        var model = this;
        $scope.editMode = false;
        $scope.label = "Page Name";


        model.addPage           = addPage;
        model.updatePageLabel   = updatePageLabel;
        model.deletePage        = deletePage;
        model.editPage          = editPage;
        model.sortPageUp        = sortPageUp;
        model.sortPageDown      = sortPageDown;
        model.updatePageList    = updatePageList;
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

        function editPage()
        {
            $scope.editMode = !($scope.editMode);

        }
        /*Mode page up in the List*/
        function sortPageUp(index)
        {
            if(index ==0)
            {
                return;
            }
            var temp = model.pages[index-1];
            model.pages[index-1] = model.pages[index];
            model.pages[index] = temp;

            updatePageList();


        }

        /*Mode page down in the List*/
        function sortPageDown(index)
        {

            if(index == model.pages.length-1)
            {
                return;
            }
            var temp = model.pages[index];
            model.pages[index] = model.pages[index+1];
            model.pages[index+1] = temp;

            updatePageList();


        }
        function updatePageList()
        {
            PageService.updatePageList(model.pages);

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
