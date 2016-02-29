(function(){
    angular
        .module("OmdbApp")
        .controller("LoginController", loginController);

    function loginController() {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            console.log(user);
        }
    }
})();