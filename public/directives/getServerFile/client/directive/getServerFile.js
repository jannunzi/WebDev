(function(){
    angular
        .module("getServerFile", [])
        .directive("getServerFile", getServerFile);

    function getServerFile($http) {

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

                    var a = $("<a style='position:absolute;top:0px;right:20px'>toggle</a>")
                        .click(expandCollapse);

                    var div = $("<div style='position:relative'>")
                        .append(a);

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