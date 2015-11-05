module.exports = function(app, model) {
    app.get("/api/experiments/rest/application", function(req, res){
        res.json(model.findAllApplications());
    });

    app.get("/api/experiments/rest/application/:id", function(req, res){
        res.json(model.findApplication(req.params.id));
    });
};
