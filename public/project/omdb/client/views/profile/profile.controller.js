(function(){
    angular
        .module("OmdbApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location) {
        var vm = this;

        function init() {
            var currentUser = UserService.getCurrentUser();
            if(currentUser == null) {
                $location.url("/home");
            }
        }
        return init();
    }
})();