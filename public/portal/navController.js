(function ()
  {
    angular
      .module('app')
      .controller("NavController", NavController);

    function NavController($location)
    {
      var vm = this;
      vm.course = angular.courses[0];
      vm.selectModule = selectModule;
      vm.selectTab = selectTab;
      vm.selectPillIndex = selectPillIndex;
      vm.selectedModuleIndex = 0;
      
      function selectPillIndex(pillIndex)
      {
        var url = $location.url();
        url = url.slice(0, url.lastIndexOf('/')+1) + pillIndex;
        $location.url(url);
      }
      
      function selectTab(tabName)
      {
        if (!(tabName.toLowerCase() === "Overview".toLowerCase())) {
          vm.pills = vm.course.modules[vm.selectedModuleIndex][tabName];
          $location.url("modules/" + vm.selectedModuleIndex + "/" + tabName + "/0");
        } else {
          // if overview is clicked
          var url = $location.url();
          if (url.search("module") == -1) {
            // case 1: when no module is selected, default to module 1
            url = url + "#/modules/0";
            $location.url(url);
          } else {
            // case 2: when module keyword is in url, then fetch the module number and set that as the default modul
            var startPosn = url.search("module");
            var slicedUrl = url.slice(startPosn + "module".length + 2);
            var loadedModule = slicedUrl.slice(0,slicedUrl.indexOf("/"));
            url = "modules/" + loadedModule;
            $location.url(url);
          }
        }
      }
      
      function selectModule(index)
      {
        vm.selectedModuleIndex = index;
      }
    }
})();
