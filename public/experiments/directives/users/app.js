(function() {
    angular
        .module("DirectiveUserExperiment", [
            "escapeHtml",
            "getServerFile",
            "jgaTable"
        ])
        .controller("DataController", dataController);

    function dataController($scope) {
        var users = [
            {first: "Alice", last: "Wonderland", email: "alice@email.com"},
            {first: "Bob", last: "Hope", email: "bob@oscars.com"},
            {first: "Charlie", last: "Brown", email: "charlie@schultz.com"}
        ];

        $scope.users = users;
    }

})();