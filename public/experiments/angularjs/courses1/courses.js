(function()
{
  angular
    .module("WhiteBoardApp")
    .controller("CoursesController", CoursesController);
    
    function CoursesController($scope)
    {
      $scope.courses = [
        {title: "Java 101", seats: 25, registered: 20, start: new Date(2015,1,1)},
        {title: "C#", seats: 30, registered: 25, start: new Date(2015,2,2)},
        {title: "NodeJS", seats: 35, registered: 30, start: new Date(2015, 3,3)}
      ];
      
      $scope.addCourse = addCourse;
      $scope.removeCourse = removeCourse;
      $scope.selectCourse = selectCourse;
      $scope.updateCourse = updateCourse;
      
      function updateCourse(course)
      {
        $scope.courses[$scope.selectedCourseIndex] = {
          title: course.title,
          seats: course.seats,
          start: course.start
        };
      }
      
      function selectCourse(index)
      {
        $scope.selectedCourseIndex = index;
        $scope.course = {
          title: $scope.courses[index].title,
          seats: $scope.courses[index].seats,
          start: $scope.courses[index].start
        };
      }
      
      function removeCourse(course)
      {
        var index = $scope.courses.indexOf(course);
        $scope.courses.splice(index, 1);
      }
      
      function addCourse(course)
      {
        var newCourse = {
          title : course.title,
          seats : course.seats,
          start : course.start
        };
        $scope.courses.push(newCourse);
      }
    }
})();