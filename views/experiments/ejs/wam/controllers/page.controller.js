module.exports = function(app, model) {
    app.get("/experiments/ejs/wam/page", getAllPages);
    app.post("/experiments/ejs/wam/page", createPage);
    app.get("/experiments/ejs/wam/page/:id", getPage);
    app.post("/experiments/ejs/wam/page/:id", updatePage);
    app.post("/experiments/ejs/wam/page/:id/widget", createWidget);

    function updatePage(req, res) {
        var newTitle = req.body.title;
        var newPage = {title: newTitle};
        model
            .updatePage(req.params.id, newPage)
            .then(function(page){
                var data = {
                    page: page
                };
                res.render("experiments/ejs/wam/views/page-details.ejs", data);
            });
    }

    function createWidget(req, res) {

        var widget = {
            widgetType: req.body.widgetType
        };
        //
        //if(widget.widgetType === "Heading") {
        //
        //}

        model
            .createWidget(req.params.id, widget)
            .then(function(page){
                var data = {
                    page: page
                };
                res.render("experiments/ejs/wam/views/page-details.ejs", data);
            });
    }

    function getPage(req, res) {
        model
            .getPage(req.params.id)
            .then(function(page){
                var data = {
                    page: page
                };
                res.render("experiments/ejs/wam/views/page-details.ejs", data);
            });
    }

    function createPage(req, res) {
        model
            .createPage(req.body)
            .then(function(newPage){
                res.redirect("experiments/ejs/wam/page");
            });
    }

    function getAllPages(req, res) {
        model
            .getAllPages()
            .then(function(allPages){
                var data = {
                    pages: allPages
                };
                res.render("experiments/ejs/wam/views/page-list.ejs", data);
            });
    }
};
