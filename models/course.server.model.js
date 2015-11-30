var q = require("q");

module.exports = function(mongoose) {
    var CourseSchema = require("./course.server.schema.js")(mongoose);
    var CourseModel = mongoose.model("CourseModel", CourseSchema);
    var api = {
        createCourse: createCourse,
        getAllCourses: getAllCourses,
        getCourseById: getCourseById,
        getCoursesForUserId: getCoursesForUserId,
        updateCourse: updateCourse
    };
    return api;

    function updateCourse(courseId, course) {
        var deferred = q.defer();
        CourseModel.findById(courseId, function(err, doc){
            doc.title = course.title;
            doc.save(function(err, doc){
                deferred.resolve(doc);
            })
        })
        return deferred.promise;
    }

    function getCourseById(courseId) {
        var deferred = q.defer();
        CourseModel.findById(courseId, function(err,course){
            deferred.resolve(course);
        })
        return deferred.promise;
    }

    function getCoursesForUserId(userId) {
        var deferred = q.defer();
        CourseModel.find({userId: userId}, function(err,courses){
            deferred.resolve(courses);
        })
        return deferred.promise;
    }

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