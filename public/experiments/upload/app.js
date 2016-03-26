(function(){
    angular
        .module("FileUploadExperiment", [])
        .controller("ListFilesController", listFilesController);

    function listFilesController($scope, $http) {
        $http.get("/api/experiments/upload")
            .then(
                function(response){
                    files = response.data;
                    console.log(files);
                }
            );
    }
})();