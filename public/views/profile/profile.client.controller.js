(function()
{
    angular
        .module("WhiteBoardApp")
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, UserService, $routeParams)
    {
        $rootScope.danger = null;

        var model = this;
        model.updateUser = updateUser;
        model.removeUser = removeUser;
        model.selectUser = selectUser;

        function init() {
            UserService
                .getAllUsers()
                .then(function(users){
                    model.users = users;
                });
            console.log($routeParams.userId);
            UserService
                .getUserById($routeParams.userId)
                .then(function(user){
                    model.user = user;
                });
        }
        init();

        function selectUser(index) {
            model.selectedIndex = index;
            model.user = model.users[index];
        }

        function removeUser(id) {
            UserService
                .removeUser(id)
                .then(function(status){
                    UserService
                        .getAllUsers()
                        .then(function(users){
                            model.users = users;
                        });
                });
        }

        function updateUser(user) {
            UserService
                .updateUser(user)
                .then(function(users){
                    UserService
                        .getAllUsers()
                        .then(function(users){
                            model.users = users;
                        });
                });
        }
    }
})();
