
module.exports = function(app) {
    app.get('/experiments/ejs/hello', function(req, res) {
        res.render('hello');
    });
    app.get("/experiments/ejs/scriptlet", function(req, res){
        res.render("experiments/ejs/scriptlet");
    });
    app.get("/experiments/ejs/data", function(req, res){
        var data = {
            message: "Hello"
        };
        res.render("experiments/ejs/data", data);
    });
    app.get("/experiments/ejs/json", function(req, res){
        var courses = require("../../portal/server/models/courses.mock.json");
        courses = {courses : courses};
        console.log(courses);
        res.render("experiments/ejs/json", courses);
    });
    app.get("/experiments/ejs/include", function(req, res){
        res.render("experiments/ejs/include");
    });
}
