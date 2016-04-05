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
        findAllCourses: viewCourses,
        findCourseById: findCourseById,
        findAllCoursesForUser: findAllCoursesForUser,
        findCourseByUserId: findCourseByUserId,
        findCourseByTitle: findCourseByTitle,
        updateCourseById: updateCourseById,
        addModuleToCourse: addModuleToCourse,
        deleteModuleFromCourse: deleteModuleFromCourse,
        searchModuleInCourse: searchModuleInCourse,
        findModulesForCourse: findModulesForCourse
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
};
