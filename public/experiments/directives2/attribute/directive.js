(function () {
    angular
        .module("Application")
        .directive("box", Box);

    function Box() {

        return {
            scope: {
                color: "="
            },
            templateUrl: "box.html"
        };
    }
})();