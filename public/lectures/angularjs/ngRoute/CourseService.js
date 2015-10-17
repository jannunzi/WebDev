(function(){
    angular
        .module("WhiteBoardApp")
        .factory("CourseService", CourseService);

    function CourseService() {
        var courses = [
            {title: "Java 101", seats: 12, start: new Date()},
            {title: "Node.js 101", seats: 12, start: new Date()},
            {title: "C# 101", seats: 12, start: new Date()},
            {title: "ASP.NET 101", seats: 12, start: new Date()},
        ];

        var service = {
            getAllCourses: getAllCourses
        };
        return service;

        function getAllCourses() {
            return courses;
        }
    }
})();