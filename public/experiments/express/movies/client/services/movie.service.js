(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http, $q) {

        var url = "http://www.myapifilms.com/imdb?title=TITLE&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0&callback=JSON_CALLBACK";

        var service = {
            search: search,
            like: like,
            getMovies: getMovies
        };
        return service;

        function getMovies(movieIdIMDBs) {
            console.log(movieIdIMDBs);

            var deferred = $q.defer();

            $http.get("/api/example/express/movies/movie/likes", movieIdIMDBs)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }
        function like(userId, idIMDB) {
            console.log(userId);
            console.log(idIMDB);

            var deferred = $q.defer();

            $http.post("/api/example/express/movies/user/"+userId+"/movie/"+idIMDB+"/like")
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function search(title) {

            var urlSearch = url.replace("TITLE", title);

            var deferred = $q.defer();

            $http.jsonp(urlSearch)
                .success(function(response){
                    deferred.resolve(response);
                })

            return deferred.promise;
        }
    }
})();