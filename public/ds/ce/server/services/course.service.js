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
    app.put("/api/ds/ce/course/:courseId/module", updateModule);

    app.post("/api/ds/ce/course/:courseId/module/:moduleId/assignment", addAssignment);
    app.delete("/api/ds/ce/course/:courseId/module/:moduleId/assignment/:assignmentId", removeAssignment);
    app.put("/api/ds/ce/course/:courseId/module/:moduleId/assignment/:assignmentId", updateAssignment);

    app.post("/api/ds/ce/course/:courseId/module/:moduleId/example", addExample);
    app.delete("/api/ds/ce/course/:courseId/module/:moduleId/example/:exampleId", removeExample);
    app.put("/api/ds/ce/course/:courseId/module/:moduleId/example/:exampleId", updateExample);


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

        model.updateCourse(id, course).then(function(course){
            res.json(course);
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

    function updateModule(req, res){
        var courseId = req.params.courseId;
        var modules = req.body;

        model.updateModule(courseId, modules).then(function(modules){
            res.json(modules);
        });
    }

    function addAssignment(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var assignment = req.body;

        model.addAssignment(courseId, moduleId, assignment).then(function(assignments){
            res.json(assignments);
        });
    }

    function removeAssignment(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var assignmentId = req.params.assignmentId;

        model.removeAssignment(courseId, moduleId, assignmentId).then(function(assignments){
            res.json(assignments);
        });
    }

    function updateAssignment(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var assignmentId = req.params.assignmentId;
        var assignment = req.body;

        model.updateAssignment(courseId, moduleId, assignmentId, assignment).then(function(course){
            res.json(course);
        });
    }

    function addExample(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var example = req.body;

        model.addExample(courseId, moduleId, example).then(function(examples){
            res.json(examples);
        });
    }

    function removeExample(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var exampleId = req.params.exampleId;


        model.removeExample(courseId, moduleId, exampleId).then(function(examples){
            res.json(examples);
        });
    }

    function updateExample(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var exampleId = req.params.exampleId;
        var example = req.body;

        model.updateExample(courseId, moduleId, exampleId, example).then(function(examples){
            res.json(examples);
        });

    }


}