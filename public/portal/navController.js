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
          $location.url("modules/module" + vm.selectedModuleIndex + "/" + tabName + "/0");
        } else {
          // if overview is clicked
          var url = $location.url();
          if (url.search("module") == -1) {
            // case 1: when no module is selected, default to module 1
            url = url + "#/modules/module0/index.html";
            $location.url(url);
          } else {
            // case 2: when module keyword is in url, then fetch the module number and set that as the default module
            var regEx = new RegExp('module\\d+');
            var matches = url.match(regEx);
            if(matches.length == 1) {
              var moduleNumber = matches[0].match('\\d+');
              url = "modules/module" + moduleNumber[0];
              $location.url(url);
            }
          }
        }
      }
      
      function selectModule(index)
      {
        vm.selectedModuleIndex = index;
      }
    }
})();
