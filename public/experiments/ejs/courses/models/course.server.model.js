var q = require("q");

module.exports = function(mongoose) {

    var CourseSchema = mongoose.Schema({
        title: String,
        seats: Number,
        start: {type: Date, default: Date.now}
    }, {collection: "experiments.ejs.course"});

    var CourseModel = mongoose.model("CourseModel123", CourseSchema);

    var api = {
        createCourse: createCourse,
        getAllCourses: getAllCourses
    };

    return api;

    function createCourse(course) {
        var deferred = q.defer();

        CourseModel.create(course, function(err, doc){
            deferred.resolve(doc);
        });

        return deferred.promise;
    }

    function getAllCourses() {
        var deferred = q.defer();

        CourseModel.find(function(err, courses){
            deferred.resolve(courses);
        });

        return deferred.promise;
    }
};
