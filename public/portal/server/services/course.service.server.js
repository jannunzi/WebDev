module.exports = function(app, model) {
    app.get("/api/portal/courses", getAllCourses);

    function getAllCourses(req, res) {
        model
            .getAllCourses()
            .then(function(courses){
                res.json(courses);
            });
    }
};
