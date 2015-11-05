(function()
{
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);

    function MovieDetailsController($scope, $routeParams, $http)
    {
        var id = $routeParams.idIMDB;

        console.log(id);

        $http.jsonp("http://www.myapifilms.com/imdb?idIMDB="+id+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=0&callback=JSON_CALLBACK")
            .success(function(response){
                console.log(response);
                $scope.movie = response;
            });
    }
})();
