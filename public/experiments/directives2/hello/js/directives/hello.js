(function(){
    angular
        .module("HelloDirectiveApp")
        .directive('hello', function(){
            return {
                template: 'Hello World'
            };
        });
})();