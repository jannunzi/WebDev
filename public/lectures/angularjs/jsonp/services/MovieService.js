(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {
        var url = "http://www.myapifilms.com/imdb?title=TITLE&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=5&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&adultSearch=0&callback=JSON_CALLBACK";
        var service = {
            searchMovieByTitle: searchMovieByTitle,
            likeMovie: likeMovie
        };
        return service;

        function searchMovieByTitle(title, callback) {
            var searchUrl = url.replace(/TITLE/g, title);
            $http.jsonp(searchUrl)
                .success(callback);
        }

        function likeMovie(idIMDB, callback) {
            var likes = {
                userId: 123,
                idIMDB: idIMDB
            };

            $http.post("/api/lectures/angularjs/jsonp/user/123/movie/"+idIMDB+"/like")
                .success(callback);
        }
    }
})();