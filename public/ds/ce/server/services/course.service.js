var model = require('../models/course.model.js')();

module.exports = function(app, db, mongoose){
    app.get("/api/course", getAllCourses);
    app.put("/api/course", updateCourses);

    function getAllCourses(req, res){
        res.json(model.getAll());
    }

    function updateCourses(req, res){
        var courses = req.body;
        res.json(model.update(courses));
    }
}