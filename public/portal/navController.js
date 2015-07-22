(function ()
  {
    angular
      .module('app')
      .controller("NavController", NavController);

    function NavController($location)
    {
      var vm = this;
      console.log("Nav");
      vm.course = angular.courses[0];
      vm.selectModule = selectModule;
      vm.selectTab = selectTab;
      vm.selectPillIndex = selectPillIndex;
      
      function selectPillIndex(pillIndex)
      {
        console.log(pillIndex);
//        $location.url("modules/")
        var url = $location.url();
        url = url.slice(0, url.lastIndexOf('/')+1) + pillIndex;
        console.log(url);
        $location.url(url);
      }
      
      function selectTab(tabName)
      {
        console.log(tabName);
        console.log(vm.selectedModuleIndex);
        vm.pills = vm.course.modules[vm.selectedModuleIndex][tabName];
        $location.url("modules/"+vm.selectedModuleIndex+"/"+tabName+"/0");
      }
      
      function selectModule(index)
      {
        vm.selectedModuleIndex = index;
      }
    }
})();
