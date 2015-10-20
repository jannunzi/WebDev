module.exports = function(app) {

    this.courses = [
        {title: 'Java 101', seats: 12, start: new Date()},
        {title: 'C# 101', seats: 12, start: new Date()},
        {title: 'ASP.NET 101', seats: 12, start: new Date()},
        {title: 'AngularJS 101', seats: 12, start: new Date()},
    ];

    app.get('/api/experiments/http/course', getAllCourses);
    app.get('/api/experiments/http/course/:id', getCourseById);
    app.post('/api/experiments/http/course', createCourse);
    app.put('/api/experiments/http/course/:id', updateCourse);
    app.delete('/api/experiments/http/course/:id', deleteCourse);

    function createCourse(req, res) {
        var course = req.body;
        this.courses.push(course);
        res.json(this.courses);
    }

    function updateCourse(req, res) {
        var id = req.params.id;
        var course = req.body;
        this.courses[id] = course;
    }

    function getAllCourses(req, res) {
        res.json(this.courses);
    }

    function getCourseById(req, res) {
        var id = req.params.id;
        res.json(this.courses[id]);
    }

    function deleteCourse(req, res) {
        var id = req.params.id;
        this.courses.splice(id, 1);
        res.json(this.courses);
    }
};
