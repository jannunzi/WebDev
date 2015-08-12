(function(){
  angular
    .module("WhiteBoardApp")
    .controller("CourseController", CourseController);
    
  function CourseController($scope, CourseService)
  {
    findAllCourses();
    
    $scope.selectCourse = selectCourse;
    $scope.deleteCourse = deleteCourse;
    $scope.updateCourse = updateCourse;
    
    function updateCourse(id)
    {
      CourseService.updateCourseById(id, function(response){
        $scope.courses = response;
      });
    }
    
    function deleteCourse(id)
    {
      CourseService.deleteCourseById(id, function(response){
        $scope.courses = response;
      })
    }
    
    function selectCourse(id)
    {
      CourseService.findCourseById(id, function(response){
        $scope.course = response;
      })
    }
    
    function findAllCourses()
    {
      CourseService.findAllCourses(function(response){
        $scope.courses = response;
      });
    }
  }
})();