module.exports = function(app) {

    app.get("/api/file/*", getFile);

    var fs = require("fs");
    var htmlencode = require('htmlencode');

    function getFile(req, res) {
        var file = req.params[0];
        var publicIndex = __dirname.lastIndexOf("public") - 1;
        var rootPath = __dirname.substring(0,publicIndex) + "/";
        var path = rootPath + file;
        fs.readFile(path, 'utf8',function(error, html){
            var encoded = htmlencode.htmlEncode(html);
            res.send(encoded);
        });
    }
}