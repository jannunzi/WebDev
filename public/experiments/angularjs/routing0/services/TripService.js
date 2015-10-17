(function(){
    angular
        .module("Fish360App")
        .factory("TripService", TripService);

    function TripService() {
        var trips = [
            {title: 'Trip 1', start: new Date(), end: new Date()},
            {title: 'Trip 2', start: new Date(), end: new Date()},
            {title: 'Trip 3', start: new Date(), end: new Date()}
        ];

        var service = {
            findAllTrips: findAllTrips,
            addTrip: addTrip,
            deleteTrip: deleteTrip,
            findTrip: findTrip,
            updateTrip: updateTrip
        };
        return service;

        function updateTrip(index, newTrip, callback) {
            trips[index] = {
                title: newTrip.title
            };
            callback(trips[index]);
        };

        function findTrip(index, callback) {
            callback(trips[index]);
        }
        function findAllTrips(callback) {
            callback(trips);
        }

        function deleteTrip(index, callback) {
            trips.splice(index, 1);
            callback(trips);
        }
        function addTrip(trip, callback) {
            var newTrip = {
                title: trip.title,
                start: new Date(trip.start),
                end: new Date(trip.end)
            }
            trips.push(newTrip);
            callback(trips);
        }

    }
})();