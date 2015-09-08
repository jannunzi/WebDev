(function(){
  angular
    .module("WhiteBoardApp")
    .controller("NavController", NavController);
    
  function NavController($location, $routeParams)
  {
    var vm = this;
    vm.course = angular.courses[0];    
    var url = $location.url();
    vm.selectedModuleIndex = url.split('/')[2];
    
    vm.selectModule = selectModule;
    
    function selectModule(index)
    {
      if(vm.course.modules[index].available == true)
      {
        vm.selectedModuleIndex = index;
      }
    }

  }
})();