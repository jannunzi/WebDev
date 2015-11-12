module.exports = function(app, model) {
    app.post("/experiments/mongodb/ss/sheet", createSheet);
    app.get("/experiments/mongodb/ss/sheet", readAllSheet);
    app.get("/experiments/mongodb/ss/sheet/:id", readOneSheet);
    app.put("/experiments/mongodb/ss/sheet/:id", updateSheet);
    app.delete("/experiments/mongodb/ss/sheet/:id", removeSheet);

    function createSheet(req, res) {
        model
            .createSheet(req.body)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function readAllSheet(req, res) {
        model
            .readAllSheet()
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function readOneSheet(req, res) {
        model
            .readOneSheet(req.params.id)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function updateSheet(req, res) {
        model
            .updateSheet(req.params.id, req.body)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function removeSheet(req, res) {
        model
            .removeSheet(req.params.id)
            .then(function(status){
                res.json(status);
            });
    }
};
