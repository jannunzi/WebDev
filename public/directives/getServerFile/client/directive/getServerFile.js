(function(){
    angular
        .module("getServerFile", [])
        .directive("getServerFile", getServerFile);

    function getServerFile($http, $location) {

        function expandCollapse() {
            var element = $(this).parent().find("pre");
            var height = element.css("height");
            if(height == "120px") {
                element.css("height", "auto");
            } else {
                element.css("height", "120px");
            }
        }
        function link(scope, element, attrs) {
            var file = attrs.file;
            $http.get("/api/file" + file)
                .success(function(response){

                    var toggle = $("<a style='position:absolute;top:0px;right:20px'><span class='glyphicon glyphicon-plus'></span></a>")
                        .click(expandCollapse);

                    var url = $location.absUrl();
                    url = 'view-source:' + url;

                    var view = $("<a target='_blank' style='position:absolute;top:0px;right:40px'><span class='glyphicon glyphicon-fullscreen'></span></a>")
                        .attr("href", url);

                    var div = $("<div style='position:relative'>")
                        .append(toggle)
                        .append(view);

                    var pre = $("<pre>")
                        .append(response)
                        .css("height", "120px");

                    div.append(pre);

                    element
                        .append(div);
                });
        }
        return {
            link: link
        }
    }
})();