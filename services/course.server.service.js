module.exports = function(app, CourseModel) {
    app.post("/api/portal/course", createCourse);
    app.get("/api/portal/course", getAllCourses);

    function getAllCourses(req, res) {
        CourseModel
            .getAllCourses()
            .then(function(courses){
                res.json(courses);
            });
    }

    function createCourse(req, res) {
        CourseModel
            .createCourse(req.body)
            .then(function(doc){
                res.json(doc);
            });
    }
};
