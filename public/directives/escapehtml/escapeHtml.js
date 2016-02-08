(function(){
    angular
        .module("escapeHtml", [])
        .directive("escapeHtml", escapeHtml);

    function escapeHtml() {

        function link(scope, element, attrs) {

            var height = "120px";
            if ( attrs.height ) {
                height = attrs.height;
            }

            // get the html content of the element
            var html = element.html();

            // add it to an in-memory div
            // the div automatically encodes
            // get the content back from the div
            html = $('<div/>').text(html).html().trim();

            var a = $("<a style='position:absolute;top:0px;right:20px'>toggle</a>")
                .click(expandCollapse);

            var div = $("<div style='position:relative'>");

            if (attrs.toggle !== "false") {
                div.append(a);
            }

            // add encoded content to a pre
            // set its initial height to 120px
            // if pre is clicked toggle height
            var pre = $("<pre>")
                .html(html)
                .css("height", height);

            div.append(pre);

            // add the pre to the element
            element.html(div);

            // toggles height
            function expandCollapse() {
                // get element that generated event
                var element = $(this).parent().find("pre");
                // get its height style
                var height = element.css("height");
                // expand if collapsed
                // collapse if expanded
                if(height == "120px") {
                    element.css("height", "auto");
                } else {
                    element.css("height", "120px");
                }
            }
        }

        return {
            link: link
        };
    }
})();