(function(){
    angular
        .module("PageEditorApp")
        .factory("PageService", PageService);

    function PageService($http, $q) {
        var api = {
            getAllPages    : getAllPages,
            getPageById    : getPageById,
            addPage        : addPage,
            updatePageLabel: updatePageLabel,
            deletePage     : deletePage,
            addContent     : addContent,
            saveContent    : saveContent
        };
        return api;

        function saveContent(pageId, contentIndex, content) {
            var deferred = $q.defer();

            // TODO: Shiva to create server side Web service to handle this HTTP request
            $http.put("/api/lecture/mongo/pe/page/" + pageId + "/content/" + contentIndex, content)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

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

        function updatePageLabel(page)
        {
            var deferred = $q.defer();
            $http.put("/api/lecture/mongo/pe/page/" + page._id + "/" + page.label)
            .success(function(pages)
            {
                deferred.resolve(pages);
            });
            return deferred.promise;
        }

        function deletePage(page)
        {
            var deferred = $q.defer();
            $http.delete("/api/lecture/mongo/pe/page/" + page._id)
            .success(function(pages)
            {
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