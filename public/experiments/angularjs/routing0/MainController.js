(function(){
    angular
        .module("Fish360App")
        .controller("MainController", MainController);

    function MainController($location) {
        var vm = this;

        vm.hello = "Hello";
        vm.$location = $location;
    }
})();