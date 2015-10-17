(function(){
    angular
        .module("Fish360App")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/login',{
                templateUrl: 'features/login/login.view.html'
            })
            .when('/home',{
                templateUrl: 'features/home/home.view.html'
            })
            .when('/trips',{
                templateUrl: 'features/trips/trips.view.html',
                controller:  'TripsController as controller'
            })
            .when('/trips/:index',{
                templateUrl: 'features/trips/trips.edit.view.html',
                controller:  'TripEditController as controller'
            })
    }
})();