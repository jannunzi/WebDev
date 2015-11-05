(function(){
  angular
    .module("WhiteBoardApp")
    .controller("ModuleController", ModuleController);
  
  function ModuleController($routeParams, CourseService)
  {
    
    var vm = this;
    vm.isArray = isArray;

    function init() {
      CourseService.getAllCourses().then(function(allCourses){
        vm.course = allCourses[0];
        vm.selectedModule = vm.course.modules[$routeParams.index];
        vm.selectedModuleIndex = $routeParams.index || 0;
        vm.selectedTabName = $routeParams.tabName || "overview";
        vm.selectedTabPills = vm.course.modules[vm.selectedModuleIndex][vm.selectedTabName];
        vm.selectedPillIndex = $routeParams.pillIndex || 0;

        if(vm.selectedTabName.indexOf("examples") >= 0)
        {
          vm.page = "/portal/example/example.view.html";
        }
        else if(vm.selectedTabName.indexOf("map") >= 0)
        {
          vm.page = "/portal/map/map.view.html";
        }
        else if(vm.selectedTabName == "overview")
        {
          vm.page = "/portal/modules/"+vm.selectedModuleIndex+"/index.html";
        }
        else if(vm.selectedTabName == "map")
        {
          vm.page = "/portal/modules/"+vm.selectedModuleIndex+"/map/index.html";
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
      });
    }
    init();


//    console.log(vm.module);
    function isArray(qwe)
    {
      console.log(qwe);
      return false;
    }
  }
})();

// 22 Crown Rd. Westford MA