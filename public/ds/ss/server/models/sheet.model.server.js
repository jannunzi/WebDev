var q = require("q");

module.exports = function(db, mongoose) {
    var SheetSchema = require("./sheet.schema.server.js")(mongoose);
    var SheetModel2  = mongoose.model("SheetModel2", SheetSchema);
    var api = {
        createSheet: createSheet,
        readAllSheet: readAllSheet,
        readOneSheet: readOneSheet,
        updateSheet: updateSheet,
        removeSheet: removeSheet,
        createCell: createCell,
        removeCell: removeCell,
        updateCell: updateCell
    };
    return api;

    function updateCell(sheetId, cellIndex, cell) {
        var deferred = q.defer();

        SheetModel2.findById(sheetId, function(err, sheet){
            sheet.cells[cellIndex].label      = cell.label;
            sheet.cells[cellIndex].literal    = cell.literal;
            sheet.cells[cellIndex].reference  = cell.reference;
            sheet.cells[cellIndex].ifObj      = cell.ifObj;
            sheet.cells[cellIndex].arithmetic = cell.arithmetic;
            sheet.cells[cellIndex].cellStyle  = cell.cellStyle;
            sheet.cells[cellIndex].visible    = cell.visible;
            sheet.cells[cellIndex].editable    = cell.editable;
            sheet.save(function(err, sheet){
                deferred.resolve(sheet);
            });
        });

        return deferred.promise;
    }

    /*
    function updateCells(sheetId, cellIndices, cells) {
        var deferred = q.defer();
        var promises = [];

        for(var i = 0; i < cellIndices.length; i++) {
            promises.push(updateCell(sheetId, cellIndices[i], cells[i]));
        }
        q.all(promises).then(function(res)
        {
            deferred.resolve();
        });

        return deferred.promise;
    }
    */

    function createCell(sheetId, cell) {
        var deferred = q.defer();

        SheetModel2.findById(sheetId, function(err, sheet){
            sheet.cells.push(cell);
            sheet.save(function(err, sheet){
                deferred.resolve(sheet);
            });
        });

        return deferred.promise;
    }

    function removeCell(sheetId, cellIndex) {
        var deferred = q.defer();

        SheetModel2.findById(sheetId, function(err, sheet){
            sheet.cells.splice(cellIndex, 1);
            sheet.save(function(err, sheet){
                deferred.resolve(sheet);
            });
        });

        return deferred.promise;
    }

    function createSheet(sheet) {
        var deferred = q.defer();

        SheetModel2.create(sheet, function(err, sheet) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheet);
            }
        });

        return deferred.promise;
    }

    function readAllSheet() {
        var deferred = q.defer();

        SheetModel2.find(function(err, sheets){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheets);
            }
        });

        return deferred.promise;
    }

    function readOneSheet(id) {
        var deferred = q.defer();

        SheetModel2.findById(id, function(err, sheet){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheet);
            }
        });

        return deferred.promise;
    }

    function updateSheet(id, sheet) {
        var deferred = q.defer();

        sheet.delete("_id");

        SheetModel2.update({_id: id}, {$set: sheet}, function(err, sheet) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheet);
            }
        });

        return deferred.promise;
    }

    function removeSheet(id) {
        var deferred = q.defer();

        SheetModel2.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
}