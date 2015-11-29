/* If schema constructor */
function IfSchema(type, inputCell1, inputCell2, thenCell, elseCell) {
    operation = {
        type: type
    };
    this.inputCell1 = inputCell1;
    this.inputCell2 = inputCell2;
    this.thenCell   = thenCell;
    this.elseCell   = elseCell;
}

/* Arithmetic schema constructor */
function ArithmeticSchema(type, inputCell1, inputCell2) {
    //operation = {
    //    type: type
    //};
    this.operation = type;
    this.inputCell1 = inputCell1;
    this.inputCell2 = inputCell2;
}

/* Cell constructor */
function Cell(label, literal, reference, ifObj, arithmetic, editable, cellStyle) {
    this.label      = label;
    this.literal    = literal;
    this.reference  = reference;
    this.ifObj      = ifObj;
    this.arithmetic = arithmetic;
    this.editable   = editable;
    this.cellStyle      = cellStyle;
}

(function(){
    angular
        .module("SheetEditorApp")
        .controller("SheetDetailsController", SheetDetailsController);

    function SheetDetailsController(SheetService, $routeParams, CellService, $q, $scope) {
        var model = this;

        model.addCell = addCell;
        model.removeCell = removeCell;
        model.updateCell = updateCell;
        model.functionCell = functionCell;
        model.functionCellDone = functionCellDone;
        model.functionCellReplaceDone =functionCellReplaceDone;
        model.functionCellIfDone = functionCellIfDone;
        model.leftCol = "col-sm-12";
        model.rightCol = "";
        model.showFunctionCell = false;
        model.showSheetCell = true;
        model.functionCellIndex = -1;

        function init() {
            readOneSheet($routeParams.sheetId);
        }
        init();

        function functionCell(cellIndex) {
            model.functionCellIndex = cellIndex;
            model.leftCol = "";
            model.rightCol = "col-sm-6";
            model.showFunctionCell = true;
            model.showSheetCell = false;
        }

        function functionCellIfDone(sheetId, cell1, cell2, isCell, thenCell, elseCell) {
            if(isCell == "Equal") {
                if(cell1.literal == cell2.literal)
                    addCell(sheetId, thenCell);
                else
                    addCell(sheetId, elseCell);
            }

            else if(isCell == "Not equal") {
                if(cell1.literal != cell2.literal)
                    addCell(sheetId, thenCell);
                else
                    addCell(sheetId, elseCell);
            }

            else if(isCell == "Greater") {
                if(cell1.literal > cell2.literal)
                    addCell(sheetId, thenCell);
                else
                    addCell(sheetId, elseCell);
            }

            else if(isCell == "Greater or equal") {
                if(cell1.literal >= cell2.literal)
                    addCell(sheetId, thenCell);
                else
                    addCell(sheetId, elseCell);
            }

            else if(isCell == "Less than") {
                if(cell1.literal < cell2.literal)
                    addCell(sheetId, thenCell);
                else
                    addCell(sheetId, elseCell);
            }
            else if(isCell == "Less than or equal") {
                if(cell1.literal <= cell2.literal)
                    addCell(sheetId, thenCell);
                else
                    addCell(sheetId, elseCell);
            }

            model.functionCellIndex = -1;
            model.leftCol = "col-sm-12";
            model.rightCol = "";
            model.showFunctionCell = false;
            model.showSheetCell = true;
        }

        /* Evaluate result of the specified arithmetic function. */
        function evalArithmeticFunction(cell1, cell2, operation) {
            var res;
            var val1;
            var val2;
            if(operation != "Date" && operation != "Length") {
                val1 = parseInt(cell1.literal);
                val2 = parseInt(cell2.literal);
            }

            switch(operation) {
                case "Sum":
                    res = val1 + val2;
                    break;
                case "Avg":
                    res = (val1 + val2) / 2;
                    break;
                case "Max":
                    res = (val1 > val2) ? val1 : val2;
                    break;
                case "Min":
                    res = (val1 < val2) ? val1 : val2;
                    break;
                case "Date":
                    res = Math.abs(Math.floor((Date.parse(cell1) - Date.parse(cell2)) / 86400000));
                    break;
                case "Length":
                    res = cell1.literal.length;
            }

            return res;
        }

        /* Invoked when the "Done" button is clicked - Arithmetic functions. */
        function functionCellDone(sheetId, cellIndex, cell1, cell2, operation, cellStyle) {
            var res = evalArithmeticFunction(cell1, cell2, operation);
            var cell = new Cell("",
                                res,
                                "",
                                undefined,
                                new ArithmeticSchema(operation, cell1.literal, cell2.literal),
                                false,
                                cellStyle);
            //console.log("Cell value "+cell.arithmetic.operation);

            addCell(sheetId, cell)
            .then(function()
            {
                if(cell2 == "") {
                    if (cell1.reference === undefined) {
                        cell1.reference = "";
                    }
                    cell1.reference = cell1.reference.concat(model.sheet.cells[model.sheet.cells.length - 1]._id + ";");
                    //updating refrence in old cell
                    cell = new Cell(cell1.label, cell1.literal, cell1.reference, undefined, undefined, false, cellStyle);
                    updateCell(sheetId, cellIndex, cell);
                }
                else {
                    if (cell1.reference === undefined) {
                        cell1.reference = "";
                    }
                    if (cell2.reference === undefined) {
                        cell2.reference = "";
                    }
                    cell1.reference = cell1.reference.concat(model.sheet.cells[model.sheet.cells.length - 1]._id + ";");
                    cell2.reference = cell2.reference.concat(model.sheet.cells[model.sheet.cells.length - 1]._id + ";");

                    //updating refrence in old cell
                    cell = new Cell(cell1.label, cell1.literal, cell1.reference, undefined, undefined, false, cellStyle);
                    updateCell(sheetId, cellIndex, cell);

                    //updating refrence in old cell
                    cell = new Cell(cell2.label, cell2.literal, cell2.reference, undefined, undefined, false, cellStyle);
                    updateCell(sheetId, cellIndex, cell);
                }
            });
            model.functionCellIndex = -1;
            model.leftCol = "col-sm-12";
            model.rightCol = "";
            model.showFunctionCell = false;
            model.showSheetCell = true;
        }

        function updateReference(sheetId, cellIndex, cell) {
            var cells = model.sheet.cells;
            if(cells[cellIndex].arithmetic.operation == "Length")
            return updateCell(sheetId,
                              cellIndex,
                              new Cell(cells[cellIndex].label,
                                       cell.literal.length,
                                       cells[cellIndex].reference,
                                       cells[cellIndex].ifObj,
                                       cells[cellIndex].arithmetic,
                                       cells[cellIndex].editable,
                                       cells[cellIndex].cellStyle));
        }

        $scope.updateReferences = function(sheetId, cellIndex, cell) {
            var deferred = $q.defer();
            var promises = [];
            var cells = model.sheet.cells;
            updateCell(sheetId,
                       cellIndex,
                       new Cell(cells[cellIndex].label,
                                cell.literal,
                                cells[cellIndex].reference,
                                cells[cellIndex].ifObj,
                                cells[cellIndex].arithmetic,
                                cells[cellIndex].editable,
                                cells[cellIndex].cellStyle))
            .then(function() {
                for (var i = 0; i < cells.length; i++) {
                    console.log(cell.reference.indexOf(cells[i]._id));
                    console.log(cell);
                    if (cell.reference.indexOf(cells[i]._id) > -1) {
                        promises.push(updateReference(sheetId, i, cell));
                    }
                }
            });

            $q.all(promises).then(function(res)
            {
                readOneSheet(sheetId);
                deferred.resolve();
            });
            return deferred.promise;
        }


        function functionCellReplaceDone(sheetId,Index,cell1,replace, replaceBy) {
            var newString = (cell1.literal).replace(replace,replaceBy);

            cell1.literal= newString;
            updateCell(sheetId,Index,cell1);
            model.functionCellIndex = -1;
            model.leftCol = "col-sm-12";
            model.rightCol = "";
            model.showFunctionCell = false;
            model.showSheetCell = true;
        }

        function readOneSheet(sheetId) {
            SheetService
                .readOneSheet(sheetId)
                .then(function(sheet){
                    model.sheet = sheet;
                })
        }

        function addCell(sheetId, cell) {
            var deferred = $q.defer();
            CellService
                .addCell(sheetId, cell)
                .then(function(sheet){
                    model.sheet = sheet;
                    model.cell = {};
                    deferred.resolve();
                });
            return deferred.promise;
        }

        function updateCell(sheetId, cellIndex, cell) {
            var deferred = $q.defer();
            CellService
                .updateCell(sheetId, cellIndex, cell)
                .then(function(sheet){
                    model.sheet = sheet;
                    deferred.resolve();
                });
            return deferred.promise;
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