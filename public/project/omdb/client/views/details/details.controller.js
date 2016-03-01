(function(){
    angular
        .module("OmdbApp")
        .controller("DetailsController", detailsController);

    function detailsController() {
        var vm = this;

        function init() {
            console.log("Details Controller");
        }
        init();
    }
})();