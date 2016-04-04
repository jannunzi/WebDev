/**
 * Created by ameyapandilwar on 3/8/16.
 */

var courses = require("./course.mock.json");

module.exports = function() {

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
        return courses;
    }

    function findCourseByTitle(title) {
        for (var u in courses) {
            if (courses[u].title === title) {
                return courses[u];
            }
        }
        return null;
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

    function findCourseById(courseId) {
        for (var u in courses) {
            if (courses[u]._id === parseInt(courseId)) {
                return courses[u];
            }
        }
        return null;
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
        var newCourse = {
            _id: new Date().getTime(),
            number: course.number,
            title: course.title,
            timing: course.timing,
            location: course.location,
            userId: course.userId
        };
        courses.push(newCourse);
        return courses;
    }

    function deleteCourseById(courseId) {
        for (var u in courses) {
            if (courses[u]._id == courseId) {
                courses.splice(u, 1);
                break;
            }
        }
        return courses;
    }

    function updateCourseById(courseId, course) {
        for (var u in courses) {
            if (courses[u]._id == courseId) {
                var updatedCourse = {
                    _id: courseId,
                    number: course.number,
                    title: course.title,
                    timing: course.timing,
                    location: course.location,
                    userId: course.userId
                };
                courses[u] = updatedCourse;
                return updatedCourse;
            }
        }
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
