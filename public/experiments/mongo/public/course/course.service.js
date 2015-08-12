(function(){
  angular
    .module("WhiteBoardApp")
    .factory("CourseService", CourseService);
  
  function CourseService($http)
  {
    var service = {
      findAllCourses: findAllCourses,
      findCourseById: findCourseById,
      deleteCourseById: deleteCourseById
    };
    return service;
    
    function findAllCourses(callback)
    {
      $http.get("/rest/course")
      .success(callback);
    }
    
    function findCourseById(id, callback)
    {
      $http.get("/rest/course/"+id)
      .success(callback);
    }
    function deleteCourseById(id, callback)
    {
      $http.delete("/rest/course/"+id)
      .success(callback);
    }
  }
})();