(function(){
  angular
    .module("WhiteBoardApp")
    .controller("ExampleController", ExampleController);
    
  function ExampleController($location)
  {

    var vm = this;
    vm.course = angular.courses[0];
    var url = $location.url();

    var urlPartsArray = url.split("/");

    var exampleIndex = parseInt(urlPartsArray[4]) | 0;
    var moduleIndex = parseInt(urlPartsArray[2]);
    vm.example = vm.course.modules[moduleIndex].examples[exampleIndex];

    
    if(vm.example)
    {
      $.ajax({
        url: vm.example.src,
        success: function(response)
        {
          $("#html").val(response);
        }
      });
    }
  }
})();