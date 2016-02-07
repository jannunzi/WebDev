(function(){
    angular
        .module("GetFileModule", [])
        .directive("getfile", GetFile);

    function GetFile($http) {

        function link(scope, element, attrs) {
            var file = attrs.file;
            $http.get("/api/file" + file)
                .success(function(response){
                    var pre = $("<pre>")
                        .append(response);
                    element
                        .append(pre);
                });
        }
        return {
            link: link
        }
    }
})();