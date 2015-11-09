(function(){
    angular
        .module("SheetEditorApp")
        .controller("SheetListController", SheetListController);

    function SheetListController(SheetService) {
        var model = this;

        function init() {
            SheetService
                .getAllSheets()
                .then(function(sheets){
                    model.sheets = sheets;
                });
        }
        init();
    }
})();