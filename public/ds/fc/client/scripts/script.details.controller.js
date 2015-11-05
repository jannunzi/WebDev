(function(){
    angular
        .module("ScriptEditorFCApp")
        .controller("ScriptDetailsController", ScriptDetailsController);

    function ScriptDetailsController(ScriptService, $routeParams) {
        var model = this;
        model.selectOperation = selectOperation;

        var id = $routeParams["scriptId"];

        function init() {
            ScriptService.getScriptById(id).then(
                function(script){
                    model.script = script;
                }
            );
        }
        init();

        function selectOperation(type) {
            ScriptService
                .addStatement(model.script._id, {"label":type, "tipo": type})
                .then(function(script){
                    model.script = script;
                });
        }
    }
})();