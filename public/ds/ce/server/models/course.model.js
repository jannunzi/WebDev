//var courses = require('./course.mock.json');
var q = require("q");

module.exports = function(db, mongoose) {


    var CourseSchema = require("./course.schema.js")(mongoose);

    var CourseModel = mongoose.model("CourseModel", CourseSchema);
    var api = {
        getAllCourses: getAllCourses,
        updateCourses: updateCourses,
        addCourse: addCourse
    }

    return api;

    function getAllCourses(){
        //return courses;

        var deferred = q.defer();

        CourseModel.find(function(err, courses){
            deferred.resolve(courses);
        });

        return deferred.promise;
    }

    function updateCourses(courses){

        var deferred = q.defer();

        CourseModel.remove({}, function(err, res){
            CourseModel.create(courses, function(err, created){
                deferred.resolve(created);
            })
        });
        //courses = course;

        return deferred.promise;

    }

    function addCourse(course){
        //var deferred = q.defer();
        //
        //Course.insert(course, function(err, course){
        //    Course.find(function(err, courses){
        //        deferred.resolve(courses);
        //    })
        //})
        //
        //return deferred.promise;
    }


}