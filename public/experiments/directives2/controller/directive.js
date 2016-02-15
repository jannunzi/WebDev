(function(){
    angular
        .module("ControllerApp")
        .directive("tavola", Tavola);

    function Tavola() {

        var start, end;

        function link(scope, element, attrs) {
            console.log(scope.movies);
            console.log(element);
            $(element).find("tbody").sortable({
                axis:"y",
                start: function(a, b) {
                    start = $(b.item)
                        .css("width", "100%")
                        .index();
                    for(var m in scope.movies) {
                        console.log(scope.movies[m].title);
                    }
                    console.log("====");
                },
                stop: function(a, b){
                    end = $(b.item).index();
                    var temp = scope.movies[start];
                    scope.movies.splice(start,1);
                    scope.movies.splice(end,0,temp);
                    //scope.movies[start] = scope.movies[end];
                    //scope.movies[end] = temp;
                    for(var m in scope.movies) {
                        console.log(scope.movies[m].title);
                    }
                    console.log("====");
                }
            });
        }

        return {
            link: link,
            templateUrl: "tavola.html"
        };
    }
})();