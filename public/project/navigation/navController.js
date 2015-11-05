(function ()
  {
    angular
      .module('app')
      .controller("NavController", NavController);

    function NavController($location, $routeParams, CourseService)
    {
      var moduleId = $routeParams.moduleId;
      var lectureId = $routeParams.lectureId;
      var vm = this;

      function init() {
        CourseService.getAllCourses().then(function(allCourses){
          vm.course = allCourses[0];
          vm.selectedModuleIndex = $routeParams.moduleId;
        });
      }
      init();

    }
})();
