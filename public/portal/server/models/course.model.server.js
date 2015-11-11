var q = require("q");
var coursesMock = require("./courses.mock.json");
console.log(coursesMock);

module.exports = function(db, mongoose) {
    var api = {
        getAllCourses: getAllCourses
    };
    return api;

    function getAllCourses() {
        var deferred = q.defer();

        setTimeout(
            function() {
                deferred.resolve(coursesMock);
            },
            100
        );

        return deferred.promise;
    }
};
