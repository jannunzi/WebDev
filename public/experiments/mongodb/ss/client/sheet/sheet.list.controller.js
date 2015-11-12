(function(){
    angular
        .module("SheetApp")
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
