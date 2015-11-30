//var model = require('../models/course.model.js')();
module.exports = function(app, model){
    app.get("/api/ds/ce/course", getAllCourses);
    app.put("/api/ds/ce/course", updateCourses);
    app.post("/api/ds/ce/course", addCourse);

    function getAllCourses(req, res){

        model.getAllCourses().then(function(courses){
            res.json(courses);
        });

        //res.json(model.getAll());


    }

    function updateCourses(req, res){
        var courses = req.body;
        model.updateCourses(courses).then(function(response){
            res.json(response);
        });
        //res.json(model.update(courses));
    }

    function addCourse(req, res){
        //var course = req.body;
    }
}