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
        findAllCoursesForUser: findAllCoursesForUser,
        findCourseByUserId: findCourseByUserId,
        findCourseByTitle: findCourseByTitle,
        updateCourseById: updateCourseById,
        addModuleToCourse: addModuleToCourse,
        deleteModuleFromCourse: deleteModuleFromCourse,
        searchModuleInCourse: searchModuleInCourse
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

    function findCourseByTitle(title) {
        return CourseModel.findOne({title: title});
    }

    function searchModuleInCourse(courseId, moduleId) {
        var course = findCourseById(courseId);
        for (var m in course.modules) {
            if (m === moduleId) {
                return m;
            }
        }
        return null;
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

    function addModuleToCourse(courseId) {
        for (var u in courses) {
            if (courses[u]._id == courseId) {
                var modules = courses[u].modules;
                if (modules === undefined || modules.length < 1) {
                    modules = [];
                    modules.push(1);
                } else {
                    modules.push(parseInt(modules[modules.length - 1]) + 1);
                }
                courses[u].modules = modules;
                return courses[u];
            }
        }
        return courses;
    }

    function deleteModuleFromCourse(courseId, id) {
        for (var u in courses) {
            if (courses[u]._id == courseId) {
                var modules = courses[u].modules;
                modules.splice(id, 1);
                courses[u].modules = modules;
                return courses[u];
            }
        }
        return courses;
    }
};
