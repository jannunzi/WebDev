module.exports = function(app, mongoose) {

    var CourseModel = require("./models/course.server.model.js")(mongoose);

    app.get ("/experiments/ejs/courses/courses", getAllCourses);
    app.get ("/experiments/ejs/courses/courses/delete/:id", removeCourse);
    app.post("/experiments/ejs/courses/courses", createCourse);

    function removeCourse(req, res) {
        var id = req.params.id;

        $q.all([
            CourseModel.removeCourse(id),
            CourseModel.getAllCourses()
        ]).then(function(courses){

        });
    }

    function createCourse(req, res) {
        var course = req.body;
        console.log(course);
        var data = {
            course: course
        };
        CourseModel
            .createCourse(course)
            .then(function(doc){
                CourseModel
                    .getAllCourses()
                    .then(function(courses){
                        data.courses = courses;
                        console.log(data);
                        res.render("experiments/ejs/courses/courses", data);
                    })
            });
    }

    function getAllCourses(req, res) {
        CourseModel
            .getAllCourses()
            .then(function(courses){
                var data = {
                    course: {},
                    courses: courses
                };
                res.render("experiments/ejs/courses/courses", data);
            });
    }
}