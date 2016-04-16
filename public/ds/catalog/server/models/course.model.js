/**
 * Created by ameyapandilwar on 3/8/16.
 */

var q = require('q');

module.exports = function(db, mongoose) {

    var CourseSchema = require("./course.schema.server.js")(mongoose);
    var CourseModel = mongoose.model('CatalogCourse', CourseSchema);

    var api = {
        viewCourses: viewCourses,
        createCourse: createCourse,
        deleteCourseById: deleteCourseById,
        updateCourseById: updateCourseById,

        addModuleToCourse: addModuleToCourse,
        findModulesForCourse: findModulesForCourse,
        deleteModuleFromCourse: deleteModuleFromCourse,
        updateModulesInCourse: updateModulesInCourse,

        findAllCourses: viewCourses,
        findCourseById: findCourseById,
        findAllCoursesForUser: findAllCoursesForUser,
        findCourseByUserId: findCourseByUserId,
        findCourseByTitle: findCourseByTitle,

        searchModuleInCourse: searchModuleInCourse,
        registerUserToCourse: registerUserToCourse,
        deregisterUserFromCourse: deregisterUserFromCourse,
        getCourseByNumber: getCourseByNumber,
        getModuleByNumber: getModuleByNumber,

        addAssignment: addAssignment,
        getAssignments: getAssignments,
        removeAssignment: removeAssignment,
        updateAssignment: updateAssignment,

        addLecture: addLecture,
        removeLecture: removeLecture,
        updateLecture: updateLecture,

        addLearningElement: addLearningElement,
        removeLearningElement: removeLearningElement,
        updateLearningElement: updateLearningElement,

        addExample: addExample,
        getExamples: getExamples,
        removeExample: removeExample,
        updateExample: updateExample,

        addDemo: addDemo,
        removeDemo: removeDemo,
        updateDemo: updateDemo,

        addDependency: addDependency,
        removeDependency: removeDependency,
        updateDependency: updateDependency
    };

    return api;

    function viewCourses() {
        var deferred = q.defer();

        CourseModel.find(
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function findModulesForCourse(courseId) {
        return CourseModel.findById(courseId);
    }

    function findCourseByTitle(title) {
        return CourseModel.findOne({title: title});
    }

    function getCourseByNumber(number) {
        return CourseModel.findOne({number: number});
    }

    function searchModuleInCourse(courseId, moduleId) {
        var deferred = q.defer();

        CourseModel.findById(courseId, function(err, course) {
            for (var m in course.modules) {
                if (m.title === moduleId) {
                    deferred.resolve(m);
                }
            }
        });

        return deferred.promise;
    }

    function getModuleByNumber(courseNumber, moduleNumber) {
        var deferred = q.defer();

        CourseModel.findOne({number: courseNumber}, function(err, course) {
            if (course) {
                for (var m in course.modules) {
                    if (course.modules[m].number === parseInt(moduleNumber)) {
                        deferred.resolve(course.modules[m]);
                    }
                }
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function updateModulesInCourse(courseId, modules) {
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules = modules;

            course.save(function(err, savedCourse){
                getModulesByCourseId(courseId).then(function(modules){
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

    function findCourseById(id) {
        return CourseModel.findById(id);
    }

    function findCourseByUserId(courseId) {
        var course = null;
        for (var u in courses) {
            if (courses[u].title === courseId) {
                course = courses[u];
                break;
            }
        }
        return course;
    }

    function findAllCoursesForUser(courseIds) {
        var courses = []
        for (var u in courses) {
            for (var id in courseIds) {
                if (courses[u].number === courseIds[id]) {
                    courses.push(courses[u]);
                }
            }
        }
        return courses;
    }

    function createCourse(course) {
        var deferred = q.defer();

        CourseModel.create(course, function (err, res) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }

    function deleteCourseById(id) {
        var deferred = q.defer();

        CourseModel.remove({_id: id},
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function updateCourseById(id, course) {
        var deferred = q.defer();

        CourseModel.update(
            {_id: id},
            {$set: course},
            function (err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    function addModuleToCourse(id, module) {
        var deferred = q.defer();

        CourseModel.findById(id, function(err, course){
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

    function deleteModuleFromCourse(courseId, moduleId) {
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

    function registerUserToCourse(id, username) {
        var deferred = q.defer();

        CourseModel.findById(id, function(err, course) {
            course.users.push(username);
            course.save(function(err, saved){
                getCourseById(saved._id).then(function(course) {
                    deferred.resolve(course);
                });
            });
        });

        return deferred.promise;
    }

    function deregisterUserFromCourse(id, username) {
        var deferred = q.defer();

        CourseModel.findById(id, function(err, course) {
            for (u in course.users) {
                if (course.users[u] == username) {
                    course.users.splice(u, 1);
                }
            }
            course.save(function(err, saved){
                getCourseById(saved._id).then(function(course) {
                    deferred.resolve(course);
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

    function removeDemo(courseId, moduleId, exampleId, demoId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).examples.id(exampleId).demos.id(demoId).remove();

            course.save(function(err){
                getDemos(courseId, moduleId, exampleId).then(function(demos){
                    deferred.resolve(demos);
                });
            });
        });
        return deferred.promise;
    }

    function updateDemo(courseId, moduleId, exampleId, demoId, demo){
        var deferred = q.defer();
        getCourseById(courseId).then(function(course){
            var d = course.modules.id(moduleId).examples.id(exampleId).demos.id(demoId);

            d.title = demo.title;
            d.base = demo.base;
            d.src = demo.src;
            d.dependencies = demo.dependencies;

            course.save(function(err){
                getDemos(courseId, moduleId, exampleId).then(function(demos){
                    deferred.resolve(demos);
                });
            });

        });

        return deferred.promise;
    }

    function getDependencies(courseId, moduleId, exampleId, demoId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            deferred.resolve(course.modules.id(moduleId).examples.id(exampleId).demos.id(demoId).dependencies);
        });
        return deferred.promise;
    }

    function addDependency(courseId, moduleId, exampleId, demoId, dependency){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).examples.id(exampleId).demos.id(demoId).dependencies.push(dependency);
            course.save(function(err){
                getDependencies(courseId, moduleId, exampleId, demoId).then(function(dependencies){
                    deferred.resolve(dependencies);
                });
            });
        });
        return deferred.promise;
    }

    function removeDependency(courseId, moduleId, exampleId, demoId, dependencyId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).examples.id(exampleId).demos.id(demoId).dependencies.id(dependencyId).remove();
            course.save(function(err){
                getDependencies(courseId, moduleId, exampleId, demoId).then(function(dependencies){
                    deferred.resolve(dependencies);
                });
            });
        });
        return deferred.promise;
    }

    function updateDependency(courseId, moduleId, exampleId, demoId, dependencyId, dependency){
        var deferred = q.defer();


        getCourseById(courseId).then(function(course){
            var depend = course.modules.id(moduleId).examples.id(exampleId).demos.id(demoId).dependencies.id(dependencyId);

            depend.title = dependency.title;
            depend.src = dependency.src;

            course.save(function(err){
                getDependencies(courseId, moduleId, exampleId, demoId).then(function(dependencies){
                    deferred.resolve(dependencies);
                });
            });
        });
        return deferred.promise;
    }

    function getLectures(courseId, moduleId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            deferred.resolve(course.modules.id(moduleId).lectures);
        });
        return deferred.promise;
    }

    function addLecture(courseId, moduleId, lecture){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).lectures.push(lecture);

            course.save(function(err){
                getLectures(courseId, moduleId).then(function(lectures){
                    deferred.resolve(lectures);
                });
            });
        });
        return deferred.promise;
    }

    function removeLecture(courseId, moduleId, lectureId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).lectures.id(lectureId).remove();

            course.save(function(err){
                getLectures(courseId, moduleId).then(function(lectures){
                    deferred.resolve(lectures);
                });
            });
        });
        return deferred.promise;
    }

    function updateLecture(courseId, moduleId, lectureId, lecture){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            var lect = course.modules.id(moduleId).lectures.id(lectureId);

            lect.title = lecture.title;
            lect.overview = lecture.overview;
            lect.learningElements = lecture.learningElements;

            course.save(function(err){
                getLectures(courseId, moduleId).then(function(lectures){
                    deferred.resolve(lectures);
                });
            });

        });

        return deferred.promise;
    }

    function getLearningElements(courseId, moduleId, lectureId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            deferred.resolve(course.modules.id(moduleId).lectures.id(lectureId).learningElements);
        });
        return deferred.promise;
    }

    function addLearningElement(courseId, moduleId, lectureId, le){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).lectures.id(lectureId).learningElements.push(le);
            course.save(function(err){
                getLearningElements(courseId, moduleId, lectureId).then(function(learningElements){
                    deferred.resolve(learningElements);
                });
            });
        });
        return deferred.promise;
    }

    function removeLearningElement(courseId, moduleId, lectureId, leId){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            course.modules.id(moduleId).lectures.id(lectureId).learningElements.id(leId).remove();
            course.save(function(err){
                getLearningElements(courseId, moduleId, lectureId).then(function(learningElements){
                    deferred.resolve(learningElements);
                });
            });

        });
        return deferred.promise;
    }

    function updateLearningElement(courseId, moduleId, lectureId, leId, le){
        var deferred = q.defer();

        getCourseById(courseId).then(function(course){
            var learning = course.modules.id(moduleId).lectures.id(lectureId).learningElements.id(leId);

            learning.title = le.title;
            if(learning.type==="PDF" || learning.type==="LINK"){
                learning.src = le.src;
            }
            else if(learning.type==="VIDEO" || learning.type==="SLIDE" || learning.type==="IFRAME"){
                learning.src = le.src;
                learning.width = le.width;
                learning.height = le.height;
            }
            else if(learning.type==="HTML"){
                learning.html = le.html;
            }
            course.save(function(err){
                getLearningElements(courseId, moduleId, lectureId).then(function(learningElements){
                    deferred.resolve(learningElements);
                });
            });

        });
        return deferred.promise;
    }
};