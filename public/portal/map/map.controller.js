(function()
{
  angular
    .module("WhiteBoardApp")
    .controller("MapController", MapController);
  
  function MapController($location)
  {
    var vm = this;
    vm.course = angular.courses[0];
    
    var url = $location.url();
    var urlPartsArray = url.split("/");

    vm.index = urlPartsArray[2];

  }
})();