(function(){
    angular
        .module("TemplateUrlApp")
        .directive("hello", function(){
            return {
                templateUrl: "hello.html"
            }
        });
})();