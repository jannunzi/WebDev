var fs = require("fs");

module.exports = function(app, mongoose, rootPath) {
    app.get("/experiments/ejs/explorer/explore", explore);

    function explore(req, res) {
        var queryPath = req.query.path;
        if(!queryPath || queryPath.indexOf("..") > -1) {
            queryPath = "/";
        }
        var path = rootPath + queryPath;
        var file = rootPath + queryPath + "/" + req.query.file;
        console.log(file);
        fs.readdir(path, function(err, files){
            for(var f=0; f<files.length; f++) {
                var fileName = files[f];
                var fileFull = rootPath + queryPath + "/" + files[f];
                files[f] = fs.statSync(fileFull);
                files[f].name = fileName;
            }
            if(!req.query.file) {
                file = rootPath + req.query.path + "/" + files[0].name;
            }
//            console.log(files);
            var data = {
                path: req.query.path,
                files: files,
                file: file,
                fileContent: fs.readFileSync(file)
            };
            res.render("experiments/ejs/explorer/explore", data);
        });
    }
};
