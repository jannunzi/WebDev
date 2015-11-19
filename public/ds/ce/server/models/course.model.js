var courses = require('./course.mock.json');

module.exports = function(app, db, mongoose) {
    var api = {
        getAll: getAll,
        update: update
    }

    return api;

    function getAll(){
        return courses;
    }

    function update(updatedCourses){
        courses = updatedCourses;
    }
}