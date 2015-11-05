module.exports = function(app, model) {
    app.get('/api/ds/fc/script', getAllScripts);
    app.get('/api/ds/fc/script/:id', getScriptById);
    app.post('/api/ds/fc/script', createScript);
    app.post('/api/ds/fc/script/:scriptId/statement', addStatement)
    app.delete('/api/ds/fc/script/:id', removeScript);

    function addStatement(req, res) {
        var scriptId = req.params.scriptId;
        var statement = req.body;
        model
            .addStatement(scriptId, statement)
            .then(function(script){
                res.json(script);
            });
    }

    function getScriptById(req, res) {
        var id = req.params["id"];
        model.getScriptById(id).then(function(script){
            res.json(script);
        });
    }

    function getAllScripts(req, res) {
        model.getAllScripts().then(function(scripts){
            res.json(scripts);
        });
//        res.json(model.getAllScripts());
    }

    function createScript(req, res) {
        var script = req.body;
        model.createScript(script).then(function(scripts){
            res.json(scripts);
        });
        //model.createScript(script);
        //res.json(model.getAllScripts());
    }

    function removeScript(req, res) {
        var id = req.params["id"];
        model.removeScript(id);
        res.json(model.getAllScripts());
    }
};