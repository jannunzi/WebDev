(function(){
    angular
        .module("ScriptEditorFCApp")
        .controller("ScriptListController", ScriptListController);

    function ScriptListController(ScriptService) {
        var model = this;

        model.addScript = addScript;
        model.removeScript = removeScript;

        function init() {
            //model.scripts = ScriptService.getAllScripts();

            ScriptService.getAllScripts().then(function(scripts){
                model.scripts = scripts;
            });
        }
        init();

        function removeScript(script) {
            var id = script.id;
            ScriptService.removeScript(id).then(function(scripts){
                model.scripts = scripts;
            });
        }

        function addScript(script) {
            ScriptService.addScript(script).then(function(scripts){
                model.scripts = scripts;
            });
        }
    }
})();