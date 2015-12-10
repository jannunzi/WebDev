//var model = require('../models/course.model.js')();
module.exports = function(app, model){
    app.get("/api/ds/ce/course", getAllCourses);
    app.put("/api/ds/ce/course", updateCourses);
    app.post("/api/ds/ce/course", addCourse);
    app.delete("/api/ds/ce/course/:id", removeCourse);
    app.put("/api/ds/ce/course/:id", updateCourse);

    app.post("/api/ds/ce/course/:id", addModule);
    app.get("/api/ds/ce/course/:id/module", getModulesByCourseId);
    app.delete("/api/ds/ce/course/:courseId/module/:moduleId", removeModule);

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
        var course = req.body;

        model.addCourse(course).then(function(createdCourse){
            res.json(createdCourse);
        });
    }

    function removeCourse(req, res){
        var id = req.params.id;

        model.removeCourse(id).then(function(response){
            res.json(response);
        });
    }

    function updateCourse(req, res){
        var id = req.params.id;
        var course = req.body;

        model.updateCourse(id, course).then(function(response){
            res.json(response);
        });
    }

    function addModule(req, res){
        var courseId = req.params.id;
        var module = req.body;

        model.addModule(courseId, module).then(function(modules){
            res.json(modules);
        });
    }

    function getModulesByCourseId(req, res){
        var courseId = req.params.id;

        model.getModulesByCourseId(courseId).then(function(modules){
            res.json(modules);
        });
    }

    function removeModule(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;

        model.removeModule(courseId, moduleId).then(function(modules){
            res.json(modules);
        });
    }
}