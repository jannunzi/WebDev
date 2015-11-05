(function(){
    angular
        .module("ScriptEditorFCApp")
        .controller("ScriptListController", ScriptListController);

    function ScriptListController(ScriptService) {
        var model = this;

        //model.scripts = [
        //    {"id": 1, "label": "Script 1"},
        //    {"id": 2, "label": "Script 2"},
        //    {"id": 3, "label": "Script 3"},
        //    {"id": 4, "label": "Script 4"},
        //    {"id": 5, "label": "Script 5"}
        //];

        function init() {
            model.scripts = ScriptService.getAllScripts();

            //ScriptService.getAllScripts().then(function(scripts){
            //    model.scripts = scripts;
            //});
        }
        init();
    }
})();