(function() {
    angular
        .module("DirectiveDataExperiment", [
            "escapeHtml",
            "getServerFile",
            "jgaTable"
        ])
        .controller("DataController", dataController);

    function dataController($scope) {
        var users = [
            {last: "Wonderland", first: "Alice", email: "alice@email.com"},
            {last: "Hope", first: "Bob", email: "bob@oscars.com"},
            {last: "Brown", first: "Charlie", email: "charlie@schultz.com"}
        ];

        $scope.users = users;
    }

})();