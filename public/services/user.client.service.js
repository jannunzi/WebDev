(function(){
    angular
        .module("WhiteBoardApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var api = {
            register: registerUser,
            login: login,
            logout: logout,
            updateUser: updateUser,
            updateUserAsAdmin: updateUserAsAdmin,
            getAllUsers: getAllUsers,
            getUserById: getUserById,
            removeUser: removeUser
        };
        return api;

        function getUserById(id) {
            var deferred = $q.defer();

            $http.get("/api/portal/user/"+id)
                .then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function updateUser(user) {
            var deferred = $q.defer();

            $http.put("/api/portal/user/" + user._id, user)
                .then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }


        function updateUserAsAdmin(user) {
            var deferred = $q.defer();

            $http.put("/api/portal/admin/user/" + user._id, user)
                .then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function removeUser(id) {
            var deferred = $q.defer();

            $http.delete("/api/portal/admin/user/" + id)
                .then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function getAllUsers() {
            var deferred = $q.defer();

            $http.get("/api/portal/admin/user")
                .then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function registerUser(user) {
            var deferred = $q.defer();

            $http.post("/api/portal/register", user)
                .then(
                function(response) {
                    deferred.resolve(response);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function login(user) {
            var deferred = $q.defer();

            $http.post("/api/portal/login", user)
                .then(
                function(response) {
                    deferred.resolve(response);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            $http.post("/api/portal/logout")
                .then(
                function(response) {
                    deferred.resolve(response);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }
    }
})();