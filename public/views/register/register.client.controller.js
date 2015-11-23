(function(){
    angular
        .module("WhiteBoardApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, UserService, $location) {
        var model = this;

        model.register = register;

        function register (user)
        {
            if(user.password != user.password2 || !user.password || !user.password2)
            {
                $rootScope.danger = "Your passwords don't match";
            }
            else
            {
                UserService
                    .register(user)
                    .then(function(response) {
                        if(response != null)
                        {
                            $rootScope.currentUser = response;
                            $location.url("/profile/" + response.data._id);
                        }
                        else
                        {
                            $rootScope.danger = "Unable to register";
                        }
                    });
            }
        }
    }
})();
