(function(){
    angular
        .module("OmdbApp")
        .controller("RegisterController", registerController);

    function registerController() {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            console.log(user);
        }
    }
})();