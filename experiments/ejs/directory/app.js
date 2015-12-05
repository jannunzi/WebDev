module.exports = function(app) {
    app.get("/experiments/ejs/directory", directory);

    function directory(req, res) {
        var path = req.query.path;
        var data = {
            path: path
        };
        res.render("experiments/ejs/directory/directory.ejs");
    }
};
