(function()
{
    angular
        .module("WhiteBoardApp")
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, UserService)
    {
        $rootScope.danger = null;

        var model = this;
        model.updateUser = updateUser;

        function init() {
            UserService
                .getAllUsers()
                .then(function(users){
                    model.users = users;
                });
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(user)
                .then(function(users){
                    model.users = users;
                });
        }
    }
})();
