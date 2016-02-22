// passing app from require since this
// is already running in a server
module.exports = function(app) {

    app.get('/api/hello', sayHello);
    app.get('/api/json', function (req, res) {
        var course = {
            title: 'Java 101',
            seats: 23,
            start: new Date()
        };
        res.json(course);
    });

    var courses = [
        {title: 'Java 101',      seats: 12, start: new Date()},
        {title: 'C# 101',        seats: 23, start: new Date(2015,1,23)},
        {title: 'ASP.NET 101',   seats: 34, start: new Date(2015,1,26)},
        {title: 'Node.js 101',   seats: 45, start: new Date(2015,9,5)},
        {title: 'AngularJS 101', seats: 56, start: new Date(2015,9,7)},
    ];

    app.get('/api/course', function (req, res) {
        res.json(courses);
    });

    app.get('/api/course/:id', function (req, res) {
        var index = req.params.id;
        console.log(index);
        res.json(courses[index]);
    });

    app.delete('/api/course/:id', function (req, res) {
        var index = req.params.id;
        courses.splice(index, 1);
        res.json(courses);
    });

    app.post('/api/course', function (req, res) {
        var newCourse = req.body;
        console.log(newCourse);
        courses.push(newCourse);
        res.json(courses);
    });

    app.put('/api/course/:id', function (req, res) {
        var index = req.params.id;
        courses[index] = req.body;
        res.json(courses);
    });

    function sayHello(req, res) {
        console.log('Say Hello');
        res.send('<h1>Say Hello</h1>');
    }
}