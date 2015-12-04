module.exports = function(app) {
    app.get("/experiments/ejs/scriptlet", function(req, res){
        res.render("experiments/ejs/scriptlet");
    });
}
