module.exports = function(app, model) {
    app.post("/ds/ss/sheet", createSheet);
    app.get("/ds/ss/sheet", readAllSheet);
    app.get("/ds/ss/sheet/:id", readOneSheet);
    app.put("/ds/ss/sheet/:id", updateSheet);
    app.delete("/ds/ss/sheet/:id", removeSheet);

    function createSheet(req, res) {
        console.log("req",req.body);
        model
            .createSheet(req.body)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function readAllSheet(req, res) {
        console.log("in read all sheet");
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