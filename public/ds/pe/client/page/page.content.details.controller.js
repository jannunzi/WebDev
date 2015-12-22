(function(){
    angular
        .module("PageEditorApp")
        .controller("PageContentEditorController", PageContentEditorController);

    function PageContentEditorController(PageService, $routeParams, $location, $scope) {
        var pageId = $routeParams["pageId"];
        var contentIndex = $routeParams["index"];
        $scope.fieldsOption = [

            { name: "Single Line Text Field", id: 0 },
            { name: "Multi Line Text Field", id: 1},
            { name: "Date Field", id: 2},
            { name: "Dropdown Field", id: 3},
            { name: "CheckBoxes Field", id: 4 },
            { name: "Radio Buttons Field", id: 5},
            { name: "Button Field", id: 6}];


        var model = this;
        model.saveContent = saveContent;
        model.removefieldContent = removefieldContent;
        model.editfieldContent = editfieldContent;
        model.saveFieldContent = saveFieldContent;
        model.addFieldToForm = addFieldToForm;

        function init() {
            PageService
                .getPageById(pageId)
                .then(function(page){
                    model.page = page;
                    model.content = model.page.content[contentIndex];
                });
        }
        init();
        function editfieldContent(formId, field)
        {
            console.log(model.page);
            var fieldIndex = model.page.content[contentIndex].form.fields.indexOf(field);
            console.log(fieldIndex);
            PageService
                .editfieldContent(pageId,formId, fieldIndex)
                .then(function(page){
                    model.page = page;
                    model.content = model.page.content[contentIndex];
                });
        }
        function removefieldContent(formId, field)
        {
            console.log(model.page);
            var fieldIndex = model.page.content[contentIndex].form.fields.indexOf(field);
            console.log(fieldIndex);
            PageService
                .removefieldContent(pageId,formId, fieldIndex)
                .then(function(page){
                    model.page = page;
                    model.content = model.page.content[contentIndex];
                });

        }
        function saveContent(content) {

            console.log(content);
            PageService
                .saveContent(pageId, contentIndex, content)
                .then(function () {
                    $location.url("/page/" + pageId + "/details");
                });
        }
        function saveFieldContent(formId, field)
        {
            console.log(pageId);
            console.log(formId);
            console.log(field);
            PageService.addFieldToForm(pageId,formId,field).then(function(page){
                model.page = page;
                model.content = model.page.content[contentIndex];
                $location.url("/page/" + pageId + "/details");
            });
        }

        function addFieldToForm(formId, field){
            console.log(pageId);
            console.log(formId);
            console.log(field);
            PageService.addFieldToForm(pageId,formId,field).then(function(page){
                model.page = page;
                model.content = model.page.content[contentIndex];
            });
        }


    }
})();