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
            savePageContent    : savePageContent,
            saveContent     : saveContent,
            updatePageList : updatePageList,
            updateContentList : updateContentList,
            addFieldToForm : addFieldToForm,
            removeContent : removeContent,
            removefieldContent: removefieldContent,
            editfieldContent:editfieldContent
        };
        return api;

        function updateContentList(pageId,content){

            $http.put("/api/lecture/mongo/pe/contentlist/", pageId ,content )
                .success(function(response){
                    deferred.resolve();
                });

        }
        function editfieldContent(pageId,formId,fieldIndex)
        {
            var deferred = $q.defer();
            var url = "/api/editfield/" + pageId + "/formId/" + formId + "/fieldIndex/" + fieldIndex;
            $http.post(url)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
        function removefieldContent(pageId,formId,fieldIndex){
            var deferred = $q.defer();
            var url = "/api/lecture/mongo/pe/page/" + pageId + "/formId/" + formId + "/fieldIndex/" + fieldIndex;
            $http.delete(url)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;

        }
        function removeContent(pageId, contentIndex){
            var deferred = $q.defer();
            var url = "/api/deletePage/" + pageId + "/" + contentIndex;
            $http.delete(url)
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function addFieldToForm(pageId,formId,field){
            console.log(pageId);
            console.log(formId);
            console.log(field);
            var fieldType = {
                "fieldType" : field
            }
            var deferred = $q.defer();
            var url = "/api/lecture/mongo/pe/page/" + pageId + "/form/" + formId;
            console.log(url);
            $http.post(url,fieldType)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function saveContent(pageId, contentIndex, content) {
            console.log(pageId+ " "+ contentIndex + " " + content);
            var deferred = $q.defer();
            $http.post("/api/lecture/mongo/pe/page/" +pageId+"/content1/"+contentIndex ,content)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;


        }
        function updatePageList(pages)
        {
            $http.put("/api/lecture/mongo/pe/pagelist/", pages )
                .success(function(response){
                    deferred.resolve();
                });


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
            console.log(page);
            $http.post("/api/lecture/mongo/pe/page", page)
                .success(function(pages){
                    deferred.resolve(pages);
                });

            return deferred.promise;
        }

        function addFieldsToForm(PageId, FormId, field){
            console.log(pageId);
            console.log(formId);
            console.log(field);

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
        function savePageContent(page)
        {
            var deferred = $q.defer();
            $http.put("/api/lecture/mongo/pe/page/" + page._id + "/" + page.label + "/" +  page.title)
            .success(function(response){
                deferred.resolve(response);
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

            $http.get("/api/lecture/mongo/pe/page/" + id)
                .success(function(page){
                    deferred.resolve(page);
                });

            return deferred.promise;
        }
    }
})();