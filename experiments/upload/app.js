module.exports = function(app) {

    var files = [];

    app.post('/experiments/upload', upload);
    app.get ('/api/experiments/upload', getUploadedFiles);

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
        }

        files.push(file);

        // redirect to another page after upload
        res.redirect("/experiments/upload/file-list.view.html");
    }
}
