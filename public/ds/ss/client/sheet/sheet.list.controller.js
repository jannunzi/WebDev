(function(){
    angular
        .module("SheetEditorApp")
        .controller("SheetListController", SheetListController);

    function SheetListController(SheetService) {
        var model = this;

        model.createSheet = createSheet;
        model.deleteSheet = deleteSheet;

        function init() {
            readAllSheet();
        }
        init();

        function readAllSheet() {
            SheetService
                .readAllSheet()
                .then(function(sheets){
                    model.sheets = sheets;
                });
        }

        function createSheet(sheet) {
            console.log("sheet",sheet);
            SheetService
                .createSheet(sheet)
                .then(function(sheet){
                    SheetService
                        .readAllSheet()
                        .then(function(sheets){
                            model.sheets = sheets;
                        });
                });
        }

        function deleteSheet(id) {
            SheetService
                .deleteSheet(id)
                .then(function(status){
                    SheetService
                        .readAllSheet()
                        .then(function(sheets){
                            model.sheets = sheets;
                        })
                });
        }
    }
})();

//(function(){
//    angular
//        .module("SheetEditorApp")
//        .controller("SheetListController", SheetListController);
//
//    function SheetListController(SheetService) {
//        var model = this;
//
//        function init() {
//            SheetService
//                .getAllSheets()
//                .then(function(sheets){
//                    model.sheets = sheets;
//                });
//        }
//        init();
//    }
//})();