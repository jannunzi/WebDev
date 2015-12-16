(function(){
    angular
        .module("IntroApp")
        .directive("helloDirective", helloDirective);

    function helloDirective() {
        return {
            templateUrl: "helloDirective.html",
            scope: {
                myMessage: '=message',
                users: '='
            },
            link: function(scope, element) {
                scope.linkHello = "Hello from Link";
                element.append("<h3>Hello from Element Append</h3>");
            }
        };
    }
})();
