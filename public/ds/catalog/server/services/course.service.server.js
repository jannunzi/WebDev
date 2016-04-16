/**
 * Created by ameyapandilwar on 3/25/16.
 */

module.exports = function(app, courseModel) {
    app.get("/api/ds/catalog/course", viewCourses);
    app.post("/api/ds/catalog/course", createCourse);
    app.delete("/api/ds/catalog/course/:id", deleteCourseById);
    app.put("/api/ds/catalog/course/:id", updateCourseById);

    app.post("/api/ds/catalog/course/:id/module", addModuleToCourse);
    app.get("/api/ds/catalog/course/:id/module", findModulesForCourse);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId", deleteModuleFromCourse);
    app.put("/api/ds/catalog/course/:courseId/module", updateModulesInCourse);

    app.put("/api/ds/catalog/course/:courseId/register/:username", registerUserToCourse);
    app.put("/api/ds/catalog/course/:courseId/deregister/:username", deregisterUserFromCourse);

    app.get("/api/ds/catalog/course/:number", getCourseByNumber);
    app.get("/api/ds/catalog/course/:courseNumber/module/:moduleNumber", getModuleByNumber);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/assignment", addAssignment);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/assignment/:assignmentId", removeAssignment);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/assignment/:assignmentId", updateAssignment);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/lecture", addLecture);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/lecture/:lectureId", removeLecture);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/lecture/:lectureId", updateLecture);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/lecture/:lectureId/le", addLearningElement);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/lecture/:lectureId/le/:leId", removeLearningElement);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/lecture/:lectureId/le/:leId", updateLearningElement);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/example", addExample);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId", removeExample);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId", updateExample);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo", addDemo);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo/:demoId", removeDemo);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo/:demoId", updateDemo);

    app.post("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo/:demoId/dependency", addDependency);
    app.delete("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo/:demoId/dependency/:dependencyId", removeDependency);
    app.put("/api/ds/catalog/course/:courseId/module/:moduleId/example/:exampleId/demo/:demoId/dependency/:dependencyId", updateDependency);

    function addModuleToCourse(req, res) {
        courseModel.addModuleToCourse(req.params.id, req.body).then(function(modules){
            res.json(modules);
        });
    }

    function getCourseByNumber(req, res) {
        courseModel.getCourseByNumber(req.params.number).then(function(course){
            res.json(course);
            res.json(course);
        });
    }

    function findModulesForCourse(req, res) {
        courseModel.findModulesForCourse(req.params.id).then(function(modules){
            res.json(modules);
        });
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

    function getModuleByNumber(req, res) {
        courseModel.getModuleByNumber(req.params.courseNumber, req.params.moduleNumber).then(function(module) {
            res.json(module);
        }, function(err) {
            res.status(400).send(err);
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

    function deregisterUserFromCourse(req, res) {
        courseModel.deregisterUserFromCourse(req.params.courseId, req.params.username).then(function(course) {
            res.json(course);
        }, function(err) {
            res.status(400).send(err);
        });
    }

    function addAssignment(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var assignment = req.body;

        courseModel.addAssignment(courseId, moduleId, assignment).then(function(assignments){
            res.json(assignments);
        });
    }

    function removeAssignment(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var assignmentId = req.params.assignmentId;

        courseModel.removeAssignment(courseId, moduleId, assignmentId).then(function(assignments){
            res.json(assignments);
        });
    }

    function updateAssignment(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var assignmentId = req.params.assignmentId;
        var assignment = req.body;

        courseModel.updateAssignment(courseId, moduleId, assignmentId, assignment).then(function(course){
            res.json(course);
        });
    }

    function addExample(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var example = req.body;

        courseModel.addExample(courseId, moduleId, example).then(function(examples){
            res.json(examples);
        });
    }

    function removeExample(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var exampleId = req.params.exampleId;


        courseModel.removeExample(courseId, moduleId, exampleId).then(function(examples){
            res.json(examples);
        });
    }

    function updateExample(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var exampleId = req.params.exampleId;
        var example = req.body;

        courseModel.updateExample(courseId, moduleId, exampleId, example).then(function(examples){
            res.json(examples);
        });

    }

    function addDemo(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var exampleId = req.params.exampleId;
        var demo = req.body;

        courseModel.addDemo(courseId, moduleId, exampleId, demo).then(function(demos){

            res.json(demos);
        });
    }

    function removeDemo(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var exampleId = req.params.exampleId;
        var demoId = req.params.demoId;

        courseModel.removeDemo(courseId, moduleId, exampleId, demoId).then(function(demos){
            res.json(demos);
        });

    }

    function updateDemo(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var exampleId = req.params.exampleId;
        var demoId = req.params.demoId;
        var demo = req.body;

        courseModel.updateDemo(courseId, moduleId, exampleId, demoId, demo).then(function(demos){
            res.json(demos);
        });
    }

    function addDependency(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var exampleId = req.params.exampleId;
        var demoId = req.params.demoId;
        var dependency = req.body;

        courseModel.addDependency(courseId, moduleId, exampleId, demoId, dependency).then(function(dependencies){
            res.json(dependencies);
        });
    }

    function removeDependency(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var exampleId = req.params.exampleId;
        var demoId = req.params.demoId;
        var dependencyId = req.params.dependencyId;

        courseModel.removeDependency(courseId, moduleId, exampleId, demoId, dependencyId).then(function(dependencies){
            res.json(dependencies);
        });
    }

    function updateDependency(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var exampleId = req.params.exampleId;
        var demoId = req.params.demoId;
        var dependencyId = req.params.dependencyId;
        var dependency = req.body;
        courseModel.updateDependency(courseId, moduleId, exampleId, demoId, dependencyId, dependency).then(function(dependencies){
            res.json(dependencies);
        });
    }

    function addLecture(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var lecture = req.body;

        courseModel.addLecture(courseId, moduleId, lecture).then(function(lectures){
            res.json(lectures);
        });
    }

    function removeLecture(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var lectureId = req.params.lectureId;

        courseModel.removeLecture(courseId, moduleId, lectureId).then(function(lectures){
            res.json(lectures);
        });

    }

    function updateLecture(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var lectureId = req.params.lectureId;
        var lecture = req.body;

        courseModel.updateLecture(courseId, moduleId, lectureId, lecture).then(function(lectures){
            res.json(lectures);
        });
    }

    function addLearningElement(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var lectureId = req.params.lectureId;
        var learningElement = req.body;

        courseModel.addLearningElement(courseId, moduleId, lectureId, learningElement).then(function(learningElements){
            res.json(learningElements);
        });
    }

    function removeLearningElement(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var lectureId = req.params.lectureId;
        var leId = req.params.leId;

        courseModel.removeLearningElement(courseId, moduleId, lectureId, leId).then(function(learningElements){
            res.json(learningElements);
        });

    }

    function updateLearningElement(req, res){
        var courseId = req.params.courseId;
        var moduleId = req.params.moduleId;
        var lectureId = req.params.lectureId;
        var leId = req.params.leId;
        var le = req.body;

        courseModel.updateLearningElement(courseId, moduleId, lectureId, leId, le).then(function(learningElements){
            res.json(learningElements);
        });
    }
};