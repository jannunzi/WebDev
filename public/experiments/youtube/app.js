(function(){
    angular
        .module("YouTubeAngularJS", [])
        .controller("YouTubeListController", YouTubeListController);

    function YouTubeListController($scope, $sce) {
        var videos = [
            {youTubeId : "weAe2NX5Vv4", url: $sce.trustAsResourceUrl("http://www.youtube.com/embed/weAe2NX5Vv4")},
            {youTubeId : "qpKvDw0JIlo", url: $sce.trustAsResourceUrl("http://www.youtube.com/embed/qpKvDw0JIlo")},
            {youTubeId : "LzpgJaoDW28", url: $sce.trustAsResourceUrl("http://www.youtube.com/embed/LzpgJaoDW28")}
        ];
        $scope.videos = videos;
    }
})();