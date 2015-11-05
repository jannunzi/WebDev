(function()
{
  angular
    .module("WhiteBoardApp")
    .controller("MapController", MapController);
  
  function MapController($location, CourseService)
  {
    var vm = this;

    function init() {
      CourseService.getAllCourses().then(function (allCourses) {
        vm.course = allCourses[0];

        var url = $location.url();
        var urlPartsArray = url.split("/");

        vm.index = urlPartsArray[2];
      });
    }
    init();
  }
})();