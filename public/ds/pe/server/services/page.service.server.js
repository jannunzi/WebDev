module.exports = function(app, model){
    app.post("/api/lecture/mongo/pe/page", addPage);
    app.put("/api/lecture/mongo/pe/page/:id/:label", updatePageLabel);
    app.delete("/api/lecture/mongo/pe/page/:id", deletePage);
    app.get("/api/lecture/mongo/pe/page", getAllPages);
    app.get("/api/lecture/mongo/pe/page/:id", getPageById);
    app.post("/api/lecture/mongo/pe/page/:pageId/content/:contentType", addContent);

    function addContent(req, res) {
        var pageId = req.params["pageId"];
        var contentType = req.params["contentType"];
        model
            .addContent(pageId, contentType)
            .then(function(page){
                res.json(page);
            });
    }

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

    /* Edit a page's label. */
    function updatePageLabel(req, res)
    {
        model.updatePageLabel(req.params)
        .then(function(pages)
        {
            res.json(pages);
        });
    }

    /* Delete a page. */
    function deletePage(req, res)
    {
        model.deletePage(req.params)
        .then(function(pages)
        {
            res.json(pages);
        });
    }
};