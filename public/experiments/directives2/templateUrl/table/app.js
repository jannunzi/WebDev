(function(){
    console.log(angular);
    angular
        .module("TableApp", [])
        .directive("tavola", function(){
            return {
                templateUrl: "table.html"
            };
        });
})();