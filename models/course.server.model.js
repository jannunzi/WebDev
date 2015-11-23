var q = require("q");

module.exports = function(mongoose) {
    var CourseSchema = require("./course.server.schema.js")(mongoose);
    var CourseModel = mongoose.model("CourseModel", CourseSchema);
    var api = {
        createCourse: createCourse
    };
    return api;

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