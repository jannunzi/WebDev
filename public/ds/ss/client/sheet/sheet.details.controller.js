/* Constants */
OP_IF      = "";
OP_SUM     = "Sum";
OP_AVERAGE = "Avg";
OP_MAXIMUM = "Max";
OP_MINIMUM = "Min";
OP_DATE    = "Date";
OP_LENGTH  = "Length";
OP_REPLACE = "";

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

        function cellIdxById(id) {
            var cells = model.sheet.cells;
            for(var i = 0; i < cells.length; i++) {
                if(cells[i]._id == id) {
                    return i;
                }
            }
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
                    var dateParts1 = cell1.literal.split("/");
                    var date1 = new Date(dateParts1[2], (dateParts1[1] - 1), dateParts1[0]);
                    var dateParts2 = cell2.literal.split("/");
                    var date2 = new Date(dateParts2[2], (dateParts2[1] - 1), dateParts2[0]);

                    res = Math.abs(Math.floor(date1 - date2) / 86400000);
                    break;
                case "Length":
                    res = cell1.literal.length;
            }

            return res;
        }

        /* Invoked when the "Done" button is clicked - Arithmetic functions. */
        function functionCellDone(sheetId, cellIndex, cell1, cell2, operation, cellStyle) {
            var res = evalArithmeticFunction(cell1, cell2, operation);
            var cell1Idx = cellIdxById(cell1._id);
            var cell2Idx = "-1";
            if(cell2 != "") {
                cell2Idx = cellIdxById(cell2._id);
            }
            var cell = new Cell("",
                                res,
                                "",
                                undefined,
                                new ArithmeticSchema(operation, cell1Idx, cell2Idx),
                                false,
                                cellStyle);

            addCell(sheetId, cell)
            .then(function()
            {
                /* Update the first source cell. */
                if (cell1.reference === undefined) {
                    cell1.reference = "";
                }
                cell1.reference = cell1.reference.concat(model.sheet.cells[model.sheet.cells.length - 1]._id + ";");
                cell = new Cell(cell1.label, cell1.literal, cell1.reference, undefined, undefined, false, cellStyle);
                updateCell(sheetId, cell1Idx, cell, true)
                .then(function() {
                    /* Update the second source cell. */
                    if(cell2 != "") {
                        if (cell2.reference === undefined) {
                            cell2.reference = "";
                        }
                        cell2.reference = cell2.reference.concat(model.sheet.cells[model.sheet.cells.length - 1]._id + ";");
                        cell = new Cell(cell2.label, cell2.literal, cell2.reference, undefined, undefined, false, cellStyle);
                        updateCell(sheetId, cell2Idx, cell, true);
                    }
                });
            });
            model.functionCellIndex = -1;
            model.leftCol = "col-sm-12";
            model.rightCol = "";
            model.showFunctionCell = false;
            model.showSheetCell = true;
        }

        function updateReference(sheetId, cellIndex, cell) {
            var cells = model.sheet.cells;
            var arithmetic = cells[cellIndex].arithmetic;
            var cell1 = model.sheet.cells[arithmetic.inputCell1];
            var cell2 = arithmetic.inputCell2;
            if(cell2 != -1) {
                cell2 = model.sheet.cells[cell2];
            }

            return updateCell(sheetId,
                              cellIndex,
                              new Cell(cells[cellIndex].label,
                                       evalArithmeticFunction(cell1,
                                                              cell2,
                                                              arithmetic.operation),
                                       cells[cellIndex].reference,
                                       cells[cellIndex].ifObj,
                                       arithmetic,
                                       cells[cellIndex].editable,
                                       cells[cellIndex].cellStyle),
                              false);
        }

        $scope.updateReferences = function(sheetId, cellIndex, cell) {
            var deferred = $q.defer();
            var promises = [];
            var cells = model.sheet.cells;

            /* Update the source cell. */
            updateCell(sheetId,
                       cellIndex,
                       new Cell(cells[cellIndex].label,
                                cell.literal,
                                cells[cellIndex].reference,
                                cells[cellIndex].ifObj,
                                cells[cellIndex].arithmetic,
                                cells[cellIndex].editable,
                                cells[cellIndex].cellStyle),
                       true)
            .then(function() {
                /* Update the reference cells. */
                for (var i = 0; i < cells.length; i++) {
                    console.log("cell.reference");
                    console.log(cell.reference);
                    if(cell.reference != undefined)
                        if (cell.reference.indexOf(cells[i]._id) > -1) {
                            promises.push(updateReference(sheetId, i, cell));
                        }
                }
                /* Update the current sheet. */
                $q.all(promises).then(function(res)
                {
                    readOneSheet(sheetId);
                    deferred.resolve();
                });
                return deferred.promise;
            });
        }


        function functionCellReplaceDone(sheetId,Index,cell1,replace, replaceBy) {
            var newString = (cell1.literal).replace(replace,replaceBy);

            cell1.literal= newString;
            updateCell(sheetId,Index,cell1,true);
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

        function updateCell(sheetId, cellIndex, cell, refreshFlag) {
            var deferred = $q.defer();
            CellService
                .updateCell(sheetId, cellIndex, cell)
                .then(function(sheet){
                    if(refreshFlag) {
                        model.sheet = sheet;
                    }
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