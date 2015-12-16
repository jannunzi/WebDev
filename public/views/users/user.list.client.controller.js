(function(){
    angular
        .module("WhiteBoardApp")
        .controller("UserListController", UserListController);

    function UserListController(UserService, $routeParams) {

        var model = this;
        model.updateUserAsAdmin = updateUserAsAdmin;
        model.removeUser = removeUser;
        model.selectUser = selectUser;

        function init() {
            UserService
                .getAllUsers()
                .then(function(users){
                    model.users = users;
                });
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

        function updateUserAsAdmin(user) {
            UserService
                .updateUserAsAdmin(user)
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
