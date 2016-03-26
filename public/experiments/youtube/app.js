(function(){
    angular
        .module("YouTubeAngularJS", [])
        .controller("YouTubeListController", YouTubeListController);

    function YouTubeListController($scope, $sce) {
        var videos = [
            {youTubeId : "weAe2NX5Vv4"},
            {youTubeId : "qpKvDw0JIlo"},
            {youTubeId : "LzpgJaoDW28"}
        ];
        $scope.videos = videos;
    }
})();