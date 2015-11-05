(function(){
  angular
    .module("WhiteBoardApp")
    .controller("NavController", NavController);
    
  function NavController($location, $routeParams, CourseService)
  {
    var vm = this;
//    vm.course = angular.courses[0];
    var url = $location.url();
    vm.selectedModuleIndex = url.split('/')[2];
    vm.selectModule = selectModule;

    function init() {
      CourseService.getAllCourses().then(function (allCourses) {
        vm.course = allCourses[0];
      });
    }
    init();
    
    function selectModule(index)
    {
      if(vm.course.modules[index].available == true)
      {
        vm.selectedModuleIndex = index;
      }
    }

  }
})();