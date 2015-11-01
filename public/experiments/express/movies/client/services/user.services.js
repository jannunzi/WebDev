(function(){
    angular
        .module("MovieApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var service = {
            login: login
        };
        return service;

        function login(username, password) {
            var deferred = $q.defer();

            var credentials = {
                username: username,
                password: password
            };

            $http.post("/api/example/express/movies/login", credentials)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();
