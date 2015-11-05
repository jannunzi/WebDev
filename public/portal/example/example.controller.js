(function(){
  angular
    .module("WhiteBoardApp")
    .controller("ExampleController", ExampleController);
    
  function ExampleController($location, CourseService)
  {

    var vm = this;

    function init() {
      CourseService.getAllCourses().then(function(allCourses){
        vm.course = allCourses[0];//angular.courses[0];
        var url = $location.url();

        var urlPartsArray = url.split("/");

        var exampleIndex = parseInt(urlPartsArray[4]) | 0;
        var exampleLabel = urlPartsArray[3];
        var moduleIndex = parseInt(urlPartsArray[2]);
        vm.example = vm.course.modules[moduleIndex][exampleLabel][exampleIndex];

        if(vm.example)
        {
          if(!vm.example.base)
          {
            vm.example.base = "";
          }
          var url = vm.example.base + vm.example.src;
          $.ajax({
            url: url,
            success: function(response)
            {
              $("#html").val(response);
            }
          });
        }
      });
    }
    init();
  }
})();