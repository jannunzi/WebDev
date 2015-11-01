module.exports = function(app, model) {
    app.get("/api/experiments/express/filter/filter", getAllFilters);
    app.get("/api/experiments/express/filter/filter/:id", getAllFiltersForId);
    app.get("/api/experiments/express/filter/class/:class/filter", getAllFiltersForClass);

    function getAllFilters(req, res) {
        res.json(model.getAllFilters());
    }

    function getAllFiltersForId(req, res) {
        var id = req.params.id;
        res.json(model.getAllFiltersForId(id));
    }

    function getAllFiltersForClass(req, res) {
        var className = req.params["class"];
        res.json(model.getAllFiltersForClass(className));
    }
};
