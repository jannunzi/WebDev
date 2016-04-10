/**
 * Created by ameyapandilwar on 3/25/16.
 */

module.exports = function(app, courseModel) {
    app.get("/api/ds/catalog/course", viewCourses);
    app.post("/api/ds/catalog/course", createCourse);
    app.delete("/api/ds/catalog/course/:id", deleteCourseById);
    //app.get("/api/catalog/course", findAllCoursesForUser);
    //app.get("/api/catalog/course", findCourseByUserId);
    //app.get("/api/catalog/course", findCourseByTitle);
    //app.get("/api/catalog/course", getCurrentCourse);
    //app.get("/api/catalog/course", setCurrentCourse);
    app.put("/api/ds/catalog/course/:id", updateCourseById);
    app.post("/api/ds/catalog/course/:id/module", addModuleToCourse);
    app.get("/api/ds/catalog/course/:id/module", findModulesForCourse);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId", deleteModuleFromCourse);
    app.get("/api/ds/catalog/course/:courseId/module/:moduleId", searchModuleInCourse);
    app.put("/api/ds/catalog/course/:courseId/module", updateModulesInCourse);
    app.put("/api/ds/catalog/course/:courseId/register/:username", registerUserToCourse);

    function addModuleToCourse(req, res) {
        courseModel.addModuleToCourse(req.params.id, req.body).then(function(modules){
            res.json(modules);
        });
    }

    function findModulesForCourse(req, res) {
        var course = courseModel.findModulesForCourse(req.params.id);
        //console.log(course.modules);
        //res.json(courseModel.findModulesForCourse(req.params.id));
    }

    function deleteModuleFromCourse(req, res) {
        courseModel.deleteModuleFromCourse(req.params.courseId, req.params.moduleId).then(function(modules){
            res.json(modules);
        });
    }

    function searchModuleInCourse(req, res) {
        courseModel.searchModuleInCourse(req.params.courseId, req.params.moduleId).then(function(module){
            res.json(module);
        });
    }

    function updateModulesInCourse(req, res) {
        courseModel.updateModulesInCourse(req.params.courseId, req.body).then(function(modules) {
            res.json(modules);
        });
    }

    function viewCourses(req, res) {
        courseModel.viewCourses().then(function(courses) {
            res.json(courses);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function findCourseByTitle(title) {
        for (var u in model.courses) {
            if (model.courses[u].title === title) {
                return model.courses[u];
            }
        }
        return null;
    }

    function findCourseByUserId(courseId, callback) {
        var course = null;
        for (var u in model.courses) {
            if (model.courses[u].title === courseId) {
                course = model.courses[u];
                break;
            }
        }
        callback(course);
    }

    function findAllCoursesForUser(courseIds, callback) {
        var courses = []
        for (var u in model.courses) {
            for (var id in courseIds) {
                if (model.courses[u].number === courseIds[id]) {
                    courses.push(model.courses[u]);
                }
            }
        }
        callback(courses);
    }

    function createCourse(req, res) {
        courseModel.createCourse(req.body).then(function(course) {
            res.json(course);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function deleteCourseById(req, res) {
        res.json(courseModel.deleteCourseById(req.params.id));
    }

    function updateCourseById(req, res) {
        res.json(courseModel.updateCourseById(req.params.id, req.body));
    }

    function registerUserToCourse(req, res) {
        courseModel.registerUserToCourse(req.params.courseId, req.params.username).then(function(course) {
            res.json(course);
        }, function(err) {
            res.status(400).send(err);
        });
    }
};
