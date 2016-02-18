(function () {
    angular
        .module("Application")
        .directive("box", Box);

    function Box() {

        function link(scope, element, attrs) {
            console.log(scope);
            console.log(element);
            console.log(attrs.color);

            element.css({
                position: "absolute",
                width: "100px",
                height: "100px",
                top: "40px",
                left: "30px",
                backgroundColor: attrs.color
            });

            element = $(element);
            element.draggable();
        }

        return {
            link: link
        };
    }
})();