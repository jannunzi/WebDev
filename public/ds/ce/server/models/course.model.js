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
        getCourseById: getCourseById,
        removeCourse: removeCourse,

        getModulesByCourseId: getModulesByCourseId,
        addModule: addModule,
        updateModule: updateModule,
        removeModule: removeModule,

        addAssignment: addAssignment,
        getAssignemnts: getAssignments,
        removeAssignment: removeAssignment,
        updateAssignment: updateAssignment,

        addExample: addExample,
        getExamples: getExamples,
        removeExample: removeExample,
        updateExample: updateExample,

        addDemo: addDemo

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

            getCourseById(id).then(function(course){
                deferred.resolve(course);
            });
            //deferred.resolve(response);
        });
        return deferred.promise;
    }

    function addModule(courseId, module) {
        var deferred = q.defer();

        CourseModel.findById(courseId, function(err, course){
            course.modules.push(module);
            course.save(function(err, saved){
                getModulesByCourseId(saved._id).then(function(modules){
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

    function getCourseById(id){

        var deferred = q.defer();

        CourseModel.findById(id, function(err, course){
            deferred.resolve(course);
        });

        return deferred.promise;
    }

    function updateModule(courseId, modules){
        var deferred = q.defer();

        //delete module._id;

        getCourseById(courseId).then(function(course){
            //course.modules.id(moduleId).update(course);
            course.modules = modules;

            course.save(function(err, savedCourse){
                getModulesByCourseId(courseId).then(function(modules){
                    deferred.resolve(modules);
                });
            });
        });

        return deferred.promise;
    }

    function addAssignment(courseId, moduleId, assignment){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).assignments.push(assignment);

            course.save(function(err){
                getAssignments(courseId, moduleId).then(function(assignments){
                    deferred.resolve(assignments);
                });
            });
        });

        return deferred.promise;
    }

    function getAssignments(courseId, moduleId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            deferred.resolve(course.modules.id(moduleId).assignments);
        });
        return deferred.promise;
    }

    function removeAssignment(courseId, moduleId, assignmentId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).assignments.id(assignmentId).remove();

            course.save(function(err){
                //console.log(err);
                getAssignments(courseId, moduleId).then(function(found){
                    deferred.resolve(found);
                });
            });
        });
        return deferred.promise;
    }

    function updateAssignment(courseId, moduleId, assignmentId, assignment){
        var deferred = q.defer();

        delete assignment._id;
        delete assignment.editing;
        delete assignment.open;

        getCourseById(courseId).then(function(course){

            var assig = course.modules.id(moduleId).assignments.id(assignmentId);
            assig.title = assignment.title;
            assig.src = assignment.src;

            course.save(function(err, saved){
                getAssignments(courseId, moduleId).then(function(assignments){
                    deferred.resolve(assignments);
                });
            });
        });
        return deferred.promise;
    }

    function getExamples(courseId, moduleId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            deferred.resolve(course.modules.id(moduleId).examples);
        });

        return deferred.promise;
    }

    function addExample(courseId, moduleId, example){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).examples.push(example);

            course.save(function(err, saved){
                getExamples(courseId, moduleId).then(function(examples){
                    deferred.resolve(examples);
                });
            });
        });

        return deferred.promise;
    }

    function removeExample(courseId, moduleId, exampleId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).examples.id(exampleId).remove();

            course.save(function(err){
                getExamples(courseId, moduleId).then(function(examples){
                    deferred.resolve(examples);
                });
            });
        });
        return deferred.promise;
    }

    function updateExample(courseId, moduleId, exampleId, example){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            var ex = course.modules.id(moduleId).examples.id(exampleId);
            ex.title = example.title;
            ex.demos = example.demos;

            course.save(function(err){
                getExamples(courseId, moduleId).then(function(examples){
                    deferred.resolve(examples);
                });
            });
        });
        return deferred.promise;
    }

    function getDemos(courseId, moduleId, exampleId){
        var deferred = q.defer();
        getCourseById(courseId).then(function(course){
            deferred.resolve(course.modules.id(moduleId).examples.id(exampleId).demos);
        });

        return deferred.promise;
    }

    function addDemo(courseId, moduleId, exampleId, demo){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).examples.id(exampleId).demos.push(demo);

            course.save(function(err){
                getDemos(courseId, moduleId, exampleId).then(function(demos){
                    deferred.resolve(demos);
                });
            });
        });
        return deferred.promise;
    }


}