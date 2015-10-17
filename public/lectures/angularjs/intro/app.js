(function(){

    angular.module("WhiteBoardApp", []);

    angular
        .module("WhiteBoardApp")
        .controller("HelloWorldController", HelloWorldController);

    function HelloWorldController($scope) {

        $scope.removeCourse = function(courseInstance)
        {
            var  index = $scope.courses.indexOf(courseInstance);
            console.log(index);
            $scope.courses.splice(index, 1);
        }

        $scope.hello = "Hello World !!!!";

        $scope.courseName = "Java 101";

        $scope.user = {
            fName: "Alice",
            lName: "Wonderland"
        };

        var course = {title: "C# 101", seats: 25, starts: new Date()};

        var courses = [
            course,
            {title: "PHP 101", seats: 12, starts: new Date(2015, 9, 12)},
            {title: "Node.js 101", seats: 34, starts: new Date(2015, 9, 15)},
        ];

        $scope.courses = courses;

        console.log("Hello World!!!!");
    }
})();