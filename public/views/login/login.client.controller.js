(function(){
    angular
        .module("WhiteBoardApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {
        var model = this;

        model.login = login;

        function login(user)
        {
            UserService
                .login(user)
                .then(
                function(response) {
                    console.log("Login succeeded");
                    $rootScope.currentUser = response;
                    $rootScope.danger = null;
                    $location.url("/profile");
                },
                function(error) {
                    console.log("Login failed");
                    $rootScope.danger = "Unable to login";
                }
            );
        }
    }
})();
