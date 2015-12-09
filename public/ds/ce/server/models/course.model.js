//var courses = require('./course.mock.json');
var q = require("q");

module.exports = function(db, mongoose) {


    var CourseSchema = require("./course.schema.js")(mongoose);

    var CourseModel = mongoose.model("CoursesModel", CourseSchema);
    var api = {
        getAllCourses: getAllCourses,
        updateCourses: updateCourses,
        //updateCourse: updateCourse,
        addCourse: addCourse,

        //updateCourse: updateCourse,
        //getCourseById: getCourseById,
        removeCourse: removeCourse
        //
        //getAllModules: getAllModules,
        //addModule: addModule,
        //updateModule: updateModule,
        //getModuleById: getModuleById,
        //removeModule: removeModule

        //getAllLearningElements: getAllLearningElements,
        //addLearningElement: addLearningElement,
        //updateLearningElement: updateLearningElement,
        //getLearningElementById: getLearningElementById,
        //
        //getAllVideos: getAllVideos,
        //getAllSlides: getAllSlides,
    }

    return api;

    function getAllCourses(){

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

        return deferred.promise;

    }

    function addCourse(course){

        var deferred = q.defer();

        CourseModel.create(course, function(err, response){
            deferred.resolve(response);
        });

        return deferred.promise;
    }

    function removeCourse(id){
        var deferred = q.defer();

        
        return deferred.promise;
    }


}