(function(){
    angular
        .module("OmdbApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        console.log(imdbID);

        function init() {
            console.log("Details Controller");
        }
        init();
    }
})();