//var courses = require('./course.mock.json');
var q = require("q");

module.exports = function(db, mongoose) {


    var CourseSchema = require("./course.schema.js")(mongoose);

    var CourseModel = mongoose.model("CoursesModel", CourseSchema);
    var api = {
        getAllCourses: getAllCourses,
        updateCourses: updateCourses,
        updateCourse: updateCourse,
        addCourse: addCourse,

        updateCourse: updateCourse,
        //getCourseById: getCourseById,
        removeCourse: removeCourse,
        //
        getModulesByCourseId: getModulesByCourseId,
        addModule: addModule,
        removeModule: removeModule
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

//    FormModel.find(
//        { fields:
//        $elemMatch: {
//        someField: someValue,
//            someOtherField: someOtherValue
//    }
//},
//    function(err, fieldsThatMatch) {...}
//    );

    function removeCourse(id){
        var deferred = q.defer();

        CourseModel.remove({_id: id}, function(err, response){
            deferred.resolve(response);
        });

        return deferred.promise;
    }

    function updateCourse(id, course){
        var deferred = q.defer();

        delete course._id;

        CourseModel.update({_id: id}, course, function(err, response){

            getAllCourses().then(function(courses){
                deferred.resolve(courses);
            });
            //deferred.resolve(response);
        });
        return deferred.promise;
    }

    function addModule(courseId, module) {
        var deferred = q.defer();

        CourseModel.findById(courseId, function(err, course){
            course.modules.push(module);
            course.save(function(err, course){
                getModulesByCourseId(course._id).then(function(modules){
                    deferred.resolve(modules);
                });
            });
        });

        return deferred.promise;
    }

    function getModulesByCourseId(id){
        var deferred = q.defer();

        CourseModel.findById(id, function(err, course){
            deferred.resolve(course.modules);
        });
        return deferred.promise;
    }

    function removeModule(courseId, moduleId){

        var deferred = q.defer();

        CourseModel.findById(courseId, function(err, course){
            course.modules.id(moduleId).remove();
            course.save(function(err, course){
                getModulesByCourseId(course._id).then(function(modules){
                    deferred.resolve(modules);
                });
            });
        });
        return deferred.promise;
    }


}