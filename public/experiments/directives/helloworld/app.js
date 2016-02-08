(function() {

    // declare a HelloWorldDirective module
    // it depends on other directives we've
    // implemented elsewhere
    angular
        .module("HelloWorldDirective", [
            "escapeHtml",
            "getServerFile"
        ]);
})();