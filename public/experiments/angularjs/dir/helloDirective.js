(function(){
    angular
        .module("TestApp")
        .directive("helloDirective", HelloDirective);

    function HelloDirective() {
        return {
            templateUrl: "helloDirectiveTemplate.html",
            scope: {
                msg: "="
            },
            link: function(scope, element) {
                console.log(scope);
                scope.ewq = "ewq123";
                element.append("<h2>Hello form link</h2>");
            }
        };
    }
})();