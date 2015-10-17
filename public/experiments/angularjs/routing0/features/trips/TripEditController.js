(function(){
    angular
        .module("Fish360App")
        .controller("TripEditController", TripEditController);

    function TripEditController($routeParams, $location, TripService) {
        var vm = this;

        vm.updateTrip = updateTrip;
        console.log($routeParams);

        function init() {
            TripService.findTrip($routeParams.index, function(trip){
                vm.trip = {
                    title: trip.title,
                    start: trip.start,
                    end  : trip.end
                };
            });
        }
        init();

        function updateTrip(trip) {
            TripService.updateTrip($routeParams.index, trip, function(trip){
                $location.url("/trips");
            });
        }
    }
})();