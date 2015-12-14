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
    this.operation = type;
    this.inputCell1 = inputCell1;
    this.inputCell2 = inputCell2;
    this.thenCell   = thenCell;
    this.elseCell   = elseCell;
}

/* Arithmetic schema constructor */
function ArithmeticSchema(type, inputCell1, inputCell2) {
    this.operation = type;
    this.inputCell1 = inputCell1;
    this.inputCell2 = inputCell2;
}

/* Cell constructor */
function Cell(label, literal, reference, ifObj, arithmetic, editable, cellStyle, visible) {
    this.label      = label;
    this.literal    = literal;
    this.reference  = reference;
    this.ifObj      = ifObj;
    this.arithmetic = arithmetic;
    this.editable   = editable;
    this.cellStyle  = cellStyle;
    this.visible    = visible;
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
        model.functionCellUp = functionCellUp;
        model.functionCellDown = functionCellDown;
        model.functionCellDone = functionCellDone;
        //model.functionDone = functionDone;
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


        //function functionDone(sheetId,style) {
        //
        //    var visible = document.getElementById("visible");
        //    var editable = document.getElementById("editable");
        //
        //    var cellIndex = cellIdxById($routeParams.cellId);
        //    var cells = model.sheet.cells;
        //    updateCell(sheetId,
        //        cellIndex,
        //        new Cell(cells[cellIndex].label,
        //            cells[cellIndex].literal,
        //            cells[cellIndex].reference,
        //            cells[cellIndex].ifObj,
        //            cells[cellIndex].arithmetic,
        //            !editable.checked,
        //            style,
        //            visible.checked),
        //        true);
        //
        //    window.location.href ="#/sheet/"+sheetId;
        //    //model.functionCellIndex = cellIndex;
        //    //model.leftCol = "";
        //    //model.rightCol = "col-sm-6";
        //    //model.showFunctionCell = false;
        //    //model.showSheetCell = true;
        //}


        function functionCellUp(cellIndex,sheetId) {
            var cells = model.sheet.cells;
            var cell1 = cells[cellIndex];
            var cell2 = cells[cellIndex-1];

            if(cellIndex > 0)
            updateCell(sheetId,
                cellIndex-1,
                new Cell(cell1.label,
                    cell1.literal,
                    cell1.reference,
                    cell1.ifObj,
                    cell1.arithmetic,
                    cell1.editable,
                    cell1.cellStyle,
                    cell1.visible),
                true).then(function()
            {
            updateCell(sheetId,
                cellIndex,
                new Cell(cell2.label,
                    cell2.literal,
                    cell2.reference,
                    cell2.ifObj,
                    cell2.arithmetic,
                    cell2.editable,
                    cell2.cellStyle,
                    cell2.visible),
                true);
            });

            model.functionCellIndex = cellIndex;
            model.leftCol = "";
            model.rightCol = "col-sm-6";
            model.showFunctionCell = false;
            model.showSheetCell = true;
        }
        function functionCellDown(cellIndex,sheetId) {
            var cells = model.sheet.cells;
            var cell1 = cells[cellIndex];
            var cell2 = cells[cellIndex+1];

            if(cellIndex < cells.length-1)
            updateCell(sheetId,
                cellIndex+1,
                new Cell(cell1.label,
                    cell1.literal,
                    cell1.reference,
                    cell1.ifObj,
                    cell1.arithmetic,
                    cell1.editable,
                    cell1.cellStyle,
                    cell1.visible),
                true).then(function()
            {
                updateCell(sheetId,
                    cellIndex,
                    new Cell(cell2.label,
                        cell2.literal,
                        cell2.reference,
                        cell2.ifObj,
                        cell2.arithmetic,
                        cell2.editable,
                        cell2.cellStyle,
                        cell2.visible),
                    true);
            });

            model.functionCellIndex = cellIndex;
            model.leftCol = "";
            model.rightCol = "col-sm-6";
            model.showFunctionCell = false;
            model.showSheetCell = true;
        }

        function functionCell(cellIndex, sheetId) {
            var cells = model.sheet.cells;
            model.functionCellIndex = cellIndex;
            model.leftCol = "";
            model.rightCol = "col-sm-6";
            model.showFunctionCell = true;
            model.showSheetCell = true;
        }

        function cellIdxById(id) {
            var cells = model.sheet.cells;
            for(var i = 0; i < cells.length; i++) {
                if(cells[i]._id == id) {
                    return i;
                }
            }
        }
        function evalIfFunction(cell1, cell2, isCell, thenCell, elseCell) {
            var res;
            var cell1Val = parseInt(cell1.literal);
            var cell2Val = parseInt(cell2.literal);
            var thenCell = parseInt(thenCell.literal);
            var elseCell = parseInt(elseCell.literal);

            switch(isCell) {
                case "Equal":
                    res = (cell1Val == cell2Val) ? thenCell : elseCell;
                    break;
                case "Not equal":
                    res = (cell1Val != cell2Val) ? thenCell : elseCell;
                    break;
                case "Greater":
                    res = (cell1Val > cell2Val) ? thenCell : elseCell;
                    break;
                case "Greater or equal":
                    res = (cell1Val >= cell2Val) ? thenCell : elseCell;
                    break;
                case "Less than":
                    res = (cell1Val < cell2Val) ? thenCell : elseCell;
                    break;
                case "Less than or equal":
                    res = (cell1Val <= cell2Val) ? thenCell : elseCell;
                    break;
            }
            return res;
        }

        function functionCellIfDone(sheetId, cellIndex, cell1, cell2, isCell, thenCell, elseCell,cellStyle,visible, editable) {
            var res = evalIfFunction(cell1, cell2, isCell, thenCell, elseCell);

            var cell1Idx = cellIdxById(cell1._id);
            var cell2Idx = cellIdxById(cell2._id);
            var thenCellIdx = cellIdxById(thenCell._id);
            var elseCellIdx = cellIdxById(elseCell._id);

            var cell = new Cell(
                "",
                res,
                "",
                new IfSchema(isCell, cell1Idx, cell2Idx, thenCellIdx, elseCellIdx),
                undefined,
                !editable.checked,
                cellStyle,
                visible.checked);

            updateCell(sheetId, cellIndex, cell, true)
                .then(function()
                {
                    /* Update the source cells. */
                    if (cell1.reference === undefined) {
                        cell1.reference = "";
                    }
                    if (cell2.reference === undefined) {
                        cell2.reference = "";
                    }
                    if (thenCell.reference === undefined) {
                        thenCell.reference = "";
                    }
                    if (elseCell.reference === undefined) {
                        elseCell.reference = "";
                    }

                    cell1.reference = cell1.reference.concat(model.sheet.cells[cellIndex]._id + ";");
                    cell = new Cell(cell1.label, cell1.literal, cell1.reference, undefined, undefined, cell1.editable, cellStyle, cell1.visible);
                    updateCell(sheetId, cell1Idx, cell, true)
                        .then(function() {
                            cell2.reference = cell2.reference.concat(model.sheet.cells[cellIndex]._id + ";");
                            cell = new Cell(cell2.label, cell2.literal, cell2.reference, undefined, undefined, cell2.editable, cellStyle, cell2.visible);
                            updateCell(sheetId, cell2Idx, cell, true)
                                .then(function(){
                                    thenCell.reference = thenCell.reference.concat(model.sheet.cells[cellIndex]._id + ";");
                                    cell = new Cell(thenCell.label, thenCell.literal, thenCell.reference, undefined, undefined, thenCell.editable, cellStyle, thenCell.visible);
                                    updateCell(sheetId, thenCellIdx, cell, true)
                                        .then(function(){
                                            elseCell.reference = elseCell.reference.concat(model.sheet.cells[cellIndex]._id + ";");
                                            cell = new Cell(elseCell.label, elseCell.literal, elseCell.reference, undefined, undefined, elseCell.editable, cellStyle, elseCell.visible);
                                            updateCell(sheetId, elseCellIdx, cell, true)
                                                .then(function(){
                                                    window.location.href = "#/sheet/" + sheetId;
                                                });
                                        });
                            });

                        });
                });

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
                case "SUM":
                    res = val1 + val2;
                    break;
                case "AVERAGE":
                    res = (val1 + val2) / 2;
                    break;
                case "MAX":
                    res = (val1 > val2) ? val1 : val2;
                    break;
                case "MIN":
                    res = (val1 < val2) ? val1 : val2;
                    break;
                case "DATE":
                    var dateParts1 = cell1.literal.split("/");
                    var date1 = new Date(dateParts1[2], (dateParts1[1] - 1), dateParts1[0]);
                    var dateParts2 = cell2.literal.split("/");
                    var date2 = new Date(dateParts2[2], (dateParts2[1] - 1), dateParts2[0]);

                    res = Math.abs(Math.floor(date1 - date2) / 86400000);
                    break;
                case "LENGTH":
                    res = cell1.literal.length;
            }

            return res;
        }

        /* Invoked when the "Done" button is clicked - Arithmetic functions. */
        function functionCellDone(sheetId, cell1, cell2,cell3, operation, cellStyle, ifoperation, thenCell, elseCell) {
            var cellIndex = cellIdxById($routeParams.cellId);
            var visible = document.getElementById("visible");
            var editable = document.getElementById("editable");

            if(ifoperation != undefined) {
                functionCellIfDone(sheetId, cellIndex, cell1, cell2, ifoperation, thenCell, elseCell, cellStyle, visible, editable);
            }
            else if(cell1 === undefined && cell2 === undefined && cell3 === undefined) {
                    var cells = model.sheet.cells;
                    updateCell(sheetId,
                        cellIndex,
                        new Cell(cells[cellIndex].label,
                            cells[cellIndex].literal,
                            cells[cellIndex].reference,
                            cells[cellIndex].ifObj,
                            cells[cellIndex].arithmetic,
                            !editable.checked,
                            cellStyle,
                            visible.checked),
                        true);

                    window.location.href = "#/sheet/" + sheetId;
                }
                else if (cell3 !== undefined && ifoperation === undefined)
                    functionCellReplaceDone(sheetId, cellIndex, cell1, cell2.literal, cell3.literal, cellStyle, visible, editable)
                else {
                    if (cell2 === undefined)
                        cell2 = "";


                    var res = evalArithmeticFunction(cell1, cell2, operation);
                    var cell1Idx = cellIdxById(cell1._id);
                    var cell2Idx = "-1";
                    if (cell2 != "") {
                        cell2Idx = cellIdxById(cell2._id);
                    }
                    var cell = new Cell(
                        "",
                        res,
                        "",
                        undefined,
                        new ArithmeticSchema(operation, cell1Idx, cell2Idx),
                        !editable.checked,
                        cellStyle,
                        visible.checked);
                    //addCell(sheetId, cell)
                    updateCell(sheetId, cellIndex, cell, true)
                        .then(function () {
                            /* Update the first source cell. */
                            if (cell1.reference === undefined) {
                                cell1.reference = "";
                            }
                            cell1.reference = cell1.reference.concat(model.sheet.cells[cellIndex]._id + ";");
                            cell = new Cell(cell1.label, cell1.literal, cell1.reference, undefined, undefined, cell1.editable, cellStyle, cell1.visible);
                            updateCell(sheetId, cell1Idx, cell, true)
                                .then(function () {
                                    /* Update the second source cell. */
                                    if (cell2 != "") {
                                        if (cell2.reference === undefined) {
                                            cell2.reference = "";
                                        }
                                        cell2.reference = cell2.reference.concat(model.sheet.cells[cellIndex]._id + ";");
                                        cell = new Cell(cell2.label, cell2.literal, cell2.reference, undefined, undefined, cell2.editable, cellStyle, cell2.visible);
                                        updateCell(sheetId, cell2Idx, cell, true);
                                    }
                                    window.location.href = "#/sheet/" + sheetId;
                                });
                        });
                }
            //model.functionCellIndex = -1;
            //model.leftCol = "col-sm-12";
            //model.rightCol = "";
            //model.showFunctionCell = false;
            //model.showSheetCell = true;
        }

        function updateReference(sheetId, cellIndex, cell) {
            var cells = model.sheet.cells;
            var ifObj = cells[cellIndex].ifObj;
            var arithmetic = cells[cellIndex].arithmetic;
            var literal;

            if(arithmetic != undefined)
            {
                var cell1 = model.sheet.cells[arithmetic.inputCell1];
                var cell2 = arithmetic.inputCell2;
                if(cell2 != -1) {
                    cell2 = model.sheet.cells[cell2];
                }
                literal = evalArithmeticFunction(cell1, cell2, arithmetic.operation);
            }
            else
            {
                literal = evalIfFunction(cells[ifObj.inputCell1],
                                         cells[ifObj.inputCell2],
                                         ifObj.operation,
                                         cells[ifObj.thenCell],
                                         cells[ifObj.elseCell]);
            }

            return updateCell(sheetId,
                cellIndex,
                new Cell(cells[cellIndex].label,
                    literal,
                    cells[cellIndex].reference,
                    cells[cellIndex].ifObj,
                    arithmetic,
                    cells[cellIndex].editable,
                    cells[cellIndex].cellStyle,
                    cells[cellIndex].visible),
                false);
        }

        $scope.updateReferences = function(sheetId, cellIndex, cell) {
            var deferred = $q.defer();
            var cells = model.sheet.cells;
            var promises = [];

            /* Update the source cell. */
            updateCell(sheetId,
                cellIndex,
                new Cell(cells[cellIndex].label,
                    cell.literal,
                    cells[cellIndex].reference,
                    cells[cellIndex].ifObj,
                    cells[cellIndex].arithmetic,
                    cells[cellIndex].editable,
                    cells[cellIndex].cellStyle,
                    cells[cellIndex].visible),
                true)
                .then(function() {
                    /* Update the reference cells. */
                    for (var i = 0; i < cells.length; i++) {
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


        function functionCellReplaceDone(sheetId,Index,cell1,replace, replaceBy,cellStyle, visible, editable) {

            var newString = (cell1.literal).replace(replace,replaceBy);
            var cells = model.sheet.cells;

            updateCell(sheetId,
                Index,
                new Cell(cells[Index].label,
                    newString,
                    cells[Index].reference,
                    cells[Index].ifObj,
                    cells[Index].arithmetic,
                    !editable.checked,
                    cellStyle,
                    visible.checked),
                true)
            window.location.href ="#/sheet/"+sheetId;

            model.functionCellIndex = -1;
            model.leftCol = "col-sm-12";
            model.rightCol = "";
            model.showFunctionCell = false;
            model.showSheetCell = true;
        }


        function readOneSheet(sheetId) {
            var deferred = $q.defer();
            SheetService
                .readOneSheet(sheetId)
                .then(function(sheet){
                    model.sheet = sheet;
                    deferred.resolve();
                })
            return deferred.promise;
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