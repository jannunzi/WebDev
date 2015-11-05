var q = require("q");

module.exports = function(db, mongoose) {
    //var scripts = require('./script.mock.json');

    var ScriptSchema = mongoose.Schema({
        label: String,
        statements: [{ label: String, tipo: String }]
    }, {collection: 'script'});

    var ScriptModel = mongoose.model("ScriptModel", ScriptSchema);

    var api = {
        getAllScripts  : getAllScripts,
        getScriptById  : getScriptById,
        createScript: createScript,
        removeScript: removeScript,
        addStatement: addStatement
    };
    return api;

    function addStatement(scriptId, statement) {
        var deferred = q.defer();

        ScriptModel.findById(scriptId, function(err, script){
            script.statements.push(statement);
            script.save(function(err, doc){
                deferred.resolve(doc);
                //ScriptModel.find(function(err, scripts){
                //    deferred.resolve(scripts);
                //});
            });
        });

        return deferred.promise;
    }

    function getScriptById(id) {
        var deferred = q.defer();

        ScriptModel.findById(id, function(err, script){
            deferred.resolve(script);
        })

        return deferred.promise;
    }

    function getAllScripts() {
        var deferred = q.defer();

        ScriptModel.find(function(err, scripts){
            deferred.resolve(scripts);
        });

        return deferred.promise;
    }

    function createScript(script) {
        var deferred = q.defer();

        ScriptModel.create(script, function(err, script){
            ScriptModel.find(function(err, scripts){
                deferred.resolve(scripts);
            })
        })

        return deferred.promise;
//        scripts.push(script);
    }

    function removeScript(id) {
        id = parseInt(id);
        for(var s in scripts) {
            if(scripts[s].id === id) {
                scripts.splice(s, 1);
                return scripts;
            }
        }
    }
}