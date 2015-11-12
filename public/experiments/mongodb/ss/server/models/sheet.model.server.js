var q = require("q");

module.exports = function(db, mongoose) {
    var SheetSchema = require("./sheet.schema.server.js")(mongoose);
    var SheetModel  = mongoose.model("SheetModel", SheetSchema);
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

        SheetModel.findById(sheetId, function(err, sheet){
            sheet.cells[cellIndex].literal = cell.literal;
            sheet.save(function(err, sheet){
                deferred.resolve(sheet);
            });
        });

        return deferred.promise;
    }

    function createCell(sheetId, cell) {
        var deferred = q.defer();

        SheetModel.findById(sheetId, function(err, sheet){
            sheet.cells.push(cell);
            sheet.save(function(err, sheet){
                deferred.resolve(sheet);
            });
        });

        return deferred.promise;
    }

    function removeCell(sheetId, cellIndex) {
        var deferred = q.defer();

        SheetModel.findById(sheetId, function(err, sheet){
            sheet.cells.splice(cellIndex, 1);
            sheet.save(function(err, sheet){
                deferred.resolve(sheet);
            });
        });

        return deferred.promise;
    }

    function createSheet(sheet) {
        var deferred = q.defer();

        SheetModel.create(sheet, function(err, sheet) {
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

        SheetModel.find(function(err, sheets){
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

        SheetModel.findById(id, function(err, sheet){
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

        SheetModel.update({_id: id}, {$set: sheet}, function(err, sheet) {
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

        SheetModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
}