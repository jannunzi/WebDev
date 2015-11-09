module.exports = function(app, model){
    app.post("/api/lecture/mongo/pe/page", addPage);
    app.get("/api/lecture/mongo/pe/page", getAllPages);
    app.get("/api/lecture/mongo/pe/page/:id", getPageById);

    function getPageById(req, res) {
        model
            .getPageById(req.params.id)
            .then(function(page){
                res.json(page);
            });
    }

    function getAllPages(req, res) {
        model
            .getAllPages()
            .then(function(pages){
                res.json(pages);
            });
    }

    function addPage(req, res) {
        var page = req.body;
        model
            .addPage(page)
            .then(function(pages){
                res.json(pages);
            });
    }
};