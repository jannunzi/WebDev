(function(){
    angular
        .module("OmdbApp")
        .controller("LoginController", loginController);

    function loginController(UserService) {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                return;
            }
            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                    }
                });
        }
    }
})();