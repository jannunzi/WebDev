(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http, $q) {
        var api = {
            searchMovieByTitle: searchMovieByTitle,
            likes: likes
        };
        return api;

        function likes(movie) {
            var deferred = $q.defer();
            $http.post("/api/lectures/movies/likes/"+movie. idIMDB, movie)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function searchMovieByTitle(title) {

            var deferred = $q.defer();

            var url = "http://www.myapifilms.com/imdb?title=TITLE&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0&callback=JSON_CALLBACK";

            url = url.replace("TITLE", title);

            $http.jsonp(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();