(function(){
    angular
        .module("OmdbApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location) {
        var vm = this;

        function init() {
            UserService
                .getProfile();
        }
        return init();
    }
})();