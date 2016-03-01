(function(){
    angular
        .module("OmdbApp")
        .controller("RegisterController", registerController);

    function registerController(UserService) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            UserService
                .createUser(user);
        }
    }
})();