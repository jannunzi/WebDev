module.exports = function(app) {

    var files = [];

    app.post('/upload', function (req, res) {

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
    });
}
