module.exports = function(app, CourseModel) {
    app.post("/api/portal/course", createCourse);

    function createCourse(req, res) {
        CourseModel
            .createCourse(req.body)
            .then(function(doc){
                res.json(doc);
            });
    }
};
