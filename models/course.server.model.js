var q = require("q");

module.exports = function(mongoose) {
    var CourseSchema = require("./course.server.schema.js")(mongoose);
    var CourseModel = mongoose.model("CourseModel", CourseSchema);
    var api = {
        createCourse: createCourse,
        getAllCourses: getAllCourses
    };
    return api;

    function getAllCourses() {
        var deferred = q.defer();
        CourseModel.find(function(err,courses){
            deferred.resolve(courses);
        })
        return deferred.promise;
    }

    function createCourse(course) {
        var deferred = q.defer();
        CourseModel.create(course,
        function(err, doc){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        })
        return deferred.promise;
    }
};