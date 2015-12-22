module.exports = function(app, model){
    app.post("/api/lecture/mongo/pe/page", addPage);
    app.get("/api/lecture/mongo/pe/page", getAllPages);
    app.get("/api/lecture/mongo/pe/page/:id", getPageById);
    app.post("/api/lecture/mongo/pe/page/:pageId/content/:contentType", addContent);
    app.delete("/api/lecture/mongo/pe/page/:id", deletePage);
    app.put("/api/lecture/mongo/pe/pagelist", updatePageList);
    app.put("/api/lecture/mongo/pe/page/:id/:label/:title", savePageContent);
    app.get("/api/lecture/mongo/pe/page/:pageId/form/:formId", abcd);
    app.post("/api/lecture/mongo/pe/page/:pageId/content1/:contentIndex", saveContent);
    app.post("/api/lecture/mongo/pe/page/:pageId/form/:formId", addFormToField);
    app.delete("/api/deletePage/:pageId/:contentIndex", deletePageContent);
    app.delete("/api/lecture/mongo/pe/page/:pageId/formId/:formId/fieldIndex/:fieldIndex",removefieldContent);
    app.post("/api/editfield/:pageId/formId/:formId/fieldIndex/:fieldIndex", editfieldContent);

    function editfieldContent(req,res)
    {
        var pageId = req.params["pageId"];
        var formId = req.params["formId"];
        var fieldIndex = req.params["fieldIndex"];
        console.log(req.params);
        model
            .editfieldContent(pageId, formId,fieldIndex)
            .then(function(page){
                res.json(page);
            });
    }
    function removefieldContent(req,res)
    {
        var pageId = req.params["pageId"];
        var formId = req.params["formId"];
        var fieldIndex = req.params["fieldIndex"];
        console.log(req.params);
        model
            .removefieldContent(pageId, formId,fieldIndex)
            .then(function(page){
                res.json(page);
            });

    }
    function deletePageContent(req, res){
        var pageId = req.params["pageId"];
        var contentIndex = req.params["contentIndex"];
        model
            .deleteContent(pageId, contentIndex)
            .then(function(page){
                res.json(page);
            });
    }

    function abcd(req,res){
        var pageId = req.params["pageId"];
        var formId = req.params["formId"];
        }

    function addFormToField(req,res){
        var pageId = req.params["pageId"];
        var formId = req.params["formId"];
        var field = req.body;

        model
            .addFormToField(pageId, formId, field)
            .then(function(page){
                res.json(page);
            });
    }

    function addContent(req, res) {
        var pageId = req.params["pageId"];
        var contentType = req.params["contentType"];
        model
            .addContent(pageId, contentType)
            .then(function(page){
                res.json(page);
            });
    }

    function savePageContent(req, res)
    {
        model
        .savePageContent(req.params)
        .then(function(page)
        {
            res.json(page);
        });

    }
    function saveContent(req,res) {
        console.log(req.params);
        model
            .saveContent(req.params, req.body)
            .then(function(page)
            {
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

    /* Delete a page. */
    function deletePage(req, res)
    {
        model
            .deletePage(req.params.id)
            .then(function(pages)
            {
                res.json(pages);
            });
    }

    /* Update Page list order */
    function updatePageList(req,res)
    {
        model.updatePageList(req.body);
    }
};