(function(){
    angular
        .module("ControllerApp")
        .controller("TheController", TheController);

    function TheController($scope) {
        $scope.movies = [
            {title: "Star Wars", imdbid: "tt321123"},
            {title: "Star Trek", imdbid: "tt321124"},
            {title: "Terminator", imdbid: "tt321125"},
            {title: "Avatar", imdbid: "tt321126"},
            {title: "Titanic", imdbid: "tt321127"}
        ];
    }
})();