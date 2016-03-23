/**
 * Created by ameyapandilwar on 3/5/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .factory("AppointmentService", AppointmentService);

    function AppointmentService($http, $q, $rootScope) {
        var model = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            getAppointments: getAppointments
        };
        return model;

        function findUserByCredentials(username, password, callback) {
            var user = null;
            for (var u in model.users) {
                if (model.users[u].username === username && model.users[u].password === password) {
                    user = model.users[u];
                    break;
                }
            }
            callback(user);
        }

        function findAllUsers(callback) {
            callback(model.users);
        }

        function getAppointments(callback) {
            var deferred = $q.defer();

            $http.get("/api/project/appointments")
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(error) {
                    deferred.reject(error);
                })

            return deferred.promise;
        }
    }
}());