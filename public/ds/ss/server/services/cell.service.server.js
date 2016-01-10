module.exports = function(app, model) {
    app.post("/ds/ss/sheet/:sheetId/cell", createCell);
    app.put("/ds/ss/sheet/:sheetId/cell/:cellIndex", updateCell);
    app.delete("/ds/ss/sheet/:sheetId/cell/:cellIndex", removeCell);

    function updateCell(req, res) {
        model
            .updateCell(req.params.sheetId, req.params.cellIndex, req.body)
            .then(function(sheet) {
                res.json(sheet);
            });
    }

    /*
    function updateCells(req, res) {
        console.log("[cell.service.server.js] Cell indices>");
        console.log(req.params.cellIndices);
        model.updateCells(req.params.sheetId, req.params.cellIndices, req.body)
             .then(function(sheet) {
                 res.json(sheet);
             });
    }
    */

    function createCell(req, res) {
        model
            .createCell(req.params.sheetId, req.body)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function removeCell(req, res) {
        model
            .removeCell(req.params.sheetId, req.params.cellIndex)
            .then(function(sheet){
                res.json(sheet);
            });
    }
};
