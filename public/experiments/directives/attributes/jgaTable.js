// jgaTable.js
(function(){

    // declares directive in
    // custom module
    angular
        .module("jgaTable", [])
        .directive("jgaTable", jgaTable);

    // implements directive
    // templateUrl refers to template file
    function jgaTable() {
        return {
            scope: {
                "caption": "=caption",
                "border": "="
            },
            templateUrl: "jgaTable.html"
        };
    }
})();