(function(){
    angular
        .module("PageEditorApp")
        .factory("PageService", PageService);

    function PageService($http, $q) {
        var api = {
            getAllPages: getAllPages,
            getPageById: getPageById,
            addPage: addPage,
            addContent: addContent
        };
        return api;

        function addContent(pageId, contentType) {
            var deferred = $q.defer();

            $http.post("/api/lecture/mongo/pe/page/" + pageId + "/content/" + contentType)
                .success(function(page){
                    deferred.resolve(page);
                });

            return deferred.promise;
        }

        function addPage(page) {
            var deferred = $q.defer();

            $http.post("/api/lecture/mongo/pe/page", page)
                .success(function(pages){
                    deferred.resolve(pages);
                });

            return deferred.promise;
        }

        function getAllPages() {
            var deferred = $q.defer();

            $http.get("/api/lecture/mongo/pe/page")
                .success(function(pages){
                    deferred.resolve(pages);
                });

            return deferred.promise;
        }

        function getPageById(id) {
            var deferred = $q.defer();

            $http.get("/api/lecture/mongo/pe/page/"+id)
                .success(function(page){
                    deferred.resolve(page);
                });

            return deferred.promise;
        }
    }
})();