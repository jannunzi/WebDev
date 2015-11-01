module.exports = function(app, model) {
    app.get("/api/experiments/rest/application/:appId/page", function(req, res){
        model.findAllPages(req.params.appId);
    });
}