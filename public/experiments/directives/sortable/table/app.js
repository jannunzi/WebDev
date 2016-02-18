(function(){
    angular
        .module("SortableApp", ["jgaSortable"])
        .controller("SortableController", SortableController);

    function SortableController($scope) {
        $scope.users = [
            {first: "Alice", last: "Wonderland"},
            {first: "Bob", last: "Hope"},
            {first: "Charlie", last: "Brown"}
        ];
    }
})();