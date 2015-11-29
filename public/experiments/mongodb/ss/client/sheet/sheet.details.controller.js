(function(){
    angular
        .module("SheetApp")
        .controller("SheetDetailsController", SheetDetailsController);

    function SheetDetailsController(SheetService, $routeParams, CellService) {
        var model = this;

        model.addCell = addCell;
        model.removeCell = removeCell;
        model.updateCell = updateCell;
        model.functionCell = functionCell;
        model.functionCellDone = functionCellDone;
        model.leftCol = "col-sm-12";
        model.rightCol = "";
        model.showFunctionCell = false;
        model.functionCellIndex = -1;

        function init() {
            readOneSheet($routeParams.sheetId);
        }
        init();

        function functionCell(cellIndex) {
            model.functionCellIndex = cellIndex;
            model.leftCol = "col-sm-6";
            model.rightCol = "col-sm-6";
            model.showFunctionCell = true;
        }

        function functionCellDone() {
            model.functionCellIndex = -1;
            model.leftCol = "col-sm-12";
            model.rightCol = "";
            model.showFunctionCell = false;
        }

        function updateCell(sheetId, cellIndex, cell) {
            CellService
                .updateCell(sheetId, cellIndex, cell)
                .then(function(sheet){
                    //model.sheet = sheet;
                });
        }

        function readOneSheet(sheetId) {
            SheetService
                .readOneSheet(sheetId)
                .then(function(sheet){
                    model.sheet = sheet;
                })
        }

        function addCell(sheetId, cell) {
            CellService
                .addCell(sheetId, cell)
                .then(function(sheet){
                    model.sheet = sheet;
                    model.cell = {};
                });
        }

        function removeCell(sheetId, cellIndex) {
            CellService
                .removeCell(sheetId, cellIndex)
                .then(function(sheet){
                    model.sheet = sheet;
                });
        }
    }
})();