(function(){
  angular
    .module("WhiteBoardApp")
    .controller("ModuleController", ModuleController);
  
  function ModuleController($routeParams)
  {
    
    var vm = this;
    vm.course = angular.courses[0];
    vm.selectedModule = vm.course.modules[$routeParams.index];
    vm.selectedModuleIndex = $routeParams.index || 0;
    vm.selectedTabName = $routeParams.tabName || "overview";
    vm.selectedTabPills = vm.course.modules[vm.selectedModuleIndex][vm.selectedTabName];
    vm.selectedPillIndex = $routeParams.pillIndex || 0;

    if(vm.selectedTabName.indexOf("examples") >= 0)
    {
      vm.page = "/portal/example/example.view.html";
    }
    else if(vm.selectedTabName == "overview")
    {
      vm.page = "/portal/modules/"+vm.selectedModuleIndex+"/index.html";
    }
    else
    {
      vm.page = "/portal/modules/"+vm.selectedModuleIndex+"/"+vm.selectedTabName+"/"+vm.selectedPillIndex+"/index.html";
    }
    
    // create tabs
    vm.tabs = [];
    for(var key in vm.selectedModule)
    {
      var tab = vm.selectedModule[key];
      if(typeof tab == "object" && tab.length > 0)
      {
        tab.title = key;
        vm.tabs.push(tab);
      }
    }

//    console.log(vm.module);
    
    vm.isArray = isArray;
    
    function isArray(qwe)
    {
      console.log(qwe);
      return false;
    }
  }
})();

// 22 Crown Rd. Westford MA