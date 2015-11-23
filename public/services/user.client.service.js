(function(){
    angular
        .module("WhiteBoardApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var api = {
            register: register,
            login: login,
            logout: logout
        };
        return api;

        function register(user) {
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