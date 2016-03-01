(function(){
    angular
        .module("OmdbApp")
        .controller("SearchController", searchController);

    function searchController(OmdbService) {
        var vm = this;

        vm.search = search;

        function init() {

        }
        init();

        function search(movie) {
            OmdbService.searchMovieByTitle(movie.title);
        }
    }
})();