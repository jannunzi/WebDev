(function(){
    angular
        .module("jgaDirectives", [])
        .directive("jgaSlide", jgaSlide);

    function jgaSlide() {

        function toggle() {
            var element = $(this).parent();
            if(!element.hasClass("expanded")) {
                element.addClass("expanded");
                element.css("overflow", "scroll");
                element.css("position", "fixed");
                element.css("top", "0px");
                element.css("left", "0px");
                element.css("width", "100%");
                element.css("height", "100%");
                element.css("z-index", 100000);
                element.css("background-color", "white");
                element.css("padding", "25px");
                element.css("font-size", "2em");
                element.find("h2, h3, h4").css("font-size", "2em");
                element.find("a, pre").css("font-size", "1em");
                element.find("iframe")
                    .css("height", "500px")
            } else {
                element.removeClass("expanded");
                element.css("overflow", "visible");
                element.css("position", "static");
                element.css("top", "auto");
                element.css("left", "auto");
                element.css("width", "auto");
                element.css("height", "auto");
                element.css("z-index", 0);
                element.css("background-color", "transparent");
                element.css("padding", "auto");
                element.css("font-size", "1em");
                element.find("h2, h3, h4").css("font-size", "2em");
                element.find("a, pre").css("font-size", "1em");
                element.find("iframe")
                    .css("height", "300px")
            }
        }

        function link(scope, element, attrs) {
            element.find("h2, h3, h4, iframe").click(toggle);
        }
        return {
            restrict: 'AEC',
            link: link
        };
    }
})();