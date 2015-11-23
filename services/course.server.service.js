module.exports = function(app, CourseModel) {
    app.post("/api/portal/course", createCourse);
    app.get("/api/portal/course", getCourses);
    app.get("/api/portal/course/:courseId", getCourseById);
    app.put("/api/portal/course/:courseId", updateCourse);

    function updateCourse(req, res) {
        CourseModel
            .updateCourse(req.params.courseId, req.body)
            .then(function(course){
                res.json(course);
            });
    }

    function getCourseById(req, res) {
        CourseModel
            .getCourseById(req.params.courseId)
            .then(function(course){
                res.json(course);
            });
    }

    function getCourses(req, res) {
        if(req.query.userId) {
            CourseModel
                .getCoursesForUserId(req.query.userId)
                .then(function(courses){
                    res.json(courses);
                });
        } else {
            CourseModel
                .getAllCourses()
                .then(function(courses){
                    res.json(courses);
                });
        }
    }

    function createCourse(req, res) {
        CourseModel
            .createCourse(req.body)
            .then(function(doc){
                res.json(doc);
            });
    }
};
