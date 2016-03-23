/**
 * Created by ameyapandilwar on 3/10/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .factory("CourseService", CourseService);

    function CourseService($rootScope) {
        var model = {
            courses: [
                {
                    "_id": 123, "number": "CS5600", "title": "Web Development", "timing": "6 - 9 PM | W",
                    "location": "101 Chrome Hall"
                },
                {
                    "_id": 234, "number": "CS8674", "title": "Master's Project", "timing": "3 - 6 PM | M",
                    "location": "1 Hacker Way"
                },
                {
                    "_id": 345, "number": "CS6000", "title": "Database Management", "timing": "6 - 9 PM | T, F",
                    "location": "1 Infinite Loop"
                }
            ],
            createCourse: createCourse,
            deleteCourseById: deleteCourseById,
            findAllCourses: findAllCourses,
            findAllCoursesForUser: findAllCoursesForUser,
            findCourseByUserId: findCourseByUserId,
            findCourseByTitle: findCourseByTitle,
            updateCourseById: updateCourseById
        };
        return model;

        function findCourseByTitle (title) {
            for (var u in model.courses) {
                if (model.courses[u].title === title) {
                    return model.courses[u];
                }
            }
            return null;
        }

        function findCourseByUserId(courseId, callback) {
            var course = null;
            for (var u in model.courses) {
                if (model.courses[u].title === courseId) {
                    course = model.courses[u];
                    break;
                }
            }
            callback(course);
        }

        function findAllCourses(callback) {
            callback(model.courses);
        }

        function findAllCoursesForUser(courseIds, callback) {
            var courses = []
            for (var u in model.courses) {
                for (var id in courseIds) {
                    if (model.courses[u].number === courseIds[id]) {
                        courses.push(model.courses[u]);
                    }
                }
            }
            callback(courses);
        }

        function createCourse(course, callback) {
            var newCourse = {
                _id: new Date().getTime(),
                number: course.number,
                title: course.title,
                timing: course.timing,
                location: course.location,
                userId: course.userId
            };
            model.courses.push(newCourse);
            callback(model.courses);
        }

        function deleteCourseById(courseId, callback) {
            for (var u in model.courses) {
                if (model.courses[u]._id == courseId) {
                    model.courses.splice(u, 1);
                    break;
                }
            }
            callback(model.courses);
        }

        function updateCourseById(courseId, course, callback) {
            for (var u in model.courses) {
                if (model.courses[u]._id == courseId) {
                    var updatedCourse = {
                        _id: courseId,
                        number: course.number,
                        title: course.title,
                        timing: course.timing,
                        location: course.location,
                        userId: course.userId
                    };
                    model.courses[u] = updatedCourse;
                    callback(updatedCourse);
                }
            }
        }
    }
}());