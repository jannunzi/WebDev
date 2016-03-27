// load file system module
var fs = require("fs");

module.exports = function(app) {

    var files = [];

    app.post('/experiments/upload', upload);
    app.get ('/api/experiments/upload', getUploadedFiles);


    function init() {
        //readFilesFromDirectory();
    }

    init();

    function readFilesFromDirectory() {
        var uploadDir = __dirname + "/../../public/uploads";
        fs.readdir(uploadDir, function(err, filesInDirectory) {
            filesInDirectory.forEach(function(fileName){
                var file = {
                    name: fileName
                };
                files.push(file);
            });
        });
    }

    function getUploadedFiles(req, res) {
        res.json(files);
    }

    function upload(req, res) {

        var myFile = req.files.myFile;

        var file = {
            path: myFile.path,
            name: myFile.name,
            size: myFile.size,
            type: myFile.type
        };

        // optionally rename the file to its original name
        var oldPath = __dirname + "/../../" + myFile.path;
        var newPath = __dirname + "/../../public/uploads/" + myFile.name;
        fs.rename(oldPath, newPath, function(err){
            files.push(file);
            res.redirect("/experiments/upload/file-list.view.html");
        });
    }
}
