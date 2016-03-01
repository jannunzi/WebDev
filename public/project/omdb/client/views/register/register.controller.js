(function(){
    angular
        .module("OmdbApp")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            UserService
                .createUser(user)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }
})();