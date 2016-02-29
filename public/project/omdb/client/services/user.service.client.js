(function(){
    angular
        .module("OmdbApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser
        };
        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            console.log($rootScope.currentUser);
        }

        function findUserByCredentials(credentials) {
            return $http.post("/api/project/user", credentials);
        }
    }
})();