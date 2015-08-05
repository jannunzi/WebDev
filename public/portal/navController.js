(function ()
  {
    angular
      .module('app')
      .controller("NavController", NavController);

    function NavController($location)
    {
      var vm = this;

      // variable declaration on scope
      vm.course = angular.courses[0];
      vm.pills = [];
      vm.selectedModuleIndex = 1;
      vm.tabSelected = 'overview';
      vm.pillSelected = '';
      vm.moduleSelected = vm.course.modules[1].title;

      // method declaration on scope
      vm.selectModule = selectModule;
      vm.selectTab = selectTab;
      vm.selectPillIndex = selectPillIndex;


      
      function selectPillIndex(pillIndex) {
        vm.pillSelected = vm.pills[pillIndex].title;
        var url = $location.url();
        url = url.slice(0, url.lastIndexOf('/')+1) + pillIndex;
        $location.url(url);
      }
      
      function selectTab(tabName)
      {
        vm.tabSelected = tabName;
        if (!(tabName.toLowerCase() === "Overview".toLowerCase())) {
          vm.pills = vm.course.modules[vm.selectedModuleIndex][tabName];
          $location.url("modules/" + vm.selectedModuleIndex + "/" + tabName + "/0");
        } else {
          // if overview is clicked
          var url = $location.url();
          if (url.search("modules/") == -1) {
            // case 1: when no module is selected, default to module 1
            url = url + "#/modules/0";
            $location.url(url);
          } else {
            // case 2: when module keyword is in url, then fetch the module number and set that as the default module
            var regEx = new RegExp('modules/\\d+');
            var matches = url.match(regEx);
            if(matches && matches.length == 1) {
              var moduleNumber = matches[0].match('\\d+');
              url = "modules/" + moduleNumber[0];
              $location.url(url);
            }
          }
        }
      }
      
      function selectModule(index){
        vm.moduleSelected = vm.course.modules[index].title;
        vm.selectedModuleIndex = index;
      }
    }
})();
