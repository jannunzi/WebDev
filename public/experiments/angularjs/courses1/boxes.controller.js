(function() {
    angular
        .module("WhiteBoardApp")
        .controller("BoxController", BoxController);

    function BoxController($scope) {
        var modules = [
            [{required: true, name: "1"}],
            [{required: true, name: "2"},
                {level: 2, required: true, name: "3"},
                {level: 2, required: true, name: "4"},
                {level: 2, required: false, name: "5"},
                {level: 2, required: false, name: "6"}
                ]
        ];

        $scope.groups = modules;
        $scope.down = "down1";

        $scope.byModule = function(module) {
            return "down2";
        }
    }
})();