(function(){
    angular
        .module("Fish360App")
        .controller("TripsController", TripsController);

    function TripsController($location, TripService) {
        var vm = this;
        vm.deleteTrip = deleteTrip;
        vm.addTrip    = addTrip;

        function init() {
            TripService.findAllTrips(function(trips){
                vm.trips = trips;
            });
        }

        //vm.trips = [
        //    {title: 'Trip 1', start: new Date(), end: new Date()},
        //    {title: 'Trip 2', start: new Date(), end: new Date()},
        //    {title: 'Trip 3', start: new Date(), end: new Date()}
        //];

        function deleteTrip(index) {
            TripService.deleteTrip(index, function(trips){
                vm.trips = trips;
            });
        }
        function addTrip(trip) {
            //var newTrip = {
            //    title: trip.title,
            //    start: new Date(trip.start),
            //    end: new Date(trip.end)
            //}
            //vm.trips.push(newTrip);
            TripService.addTrip(trip, function(trips){
                vm.trips = trips;
            })
        }

        init();
    }
})();