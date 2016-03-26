module.exports = function(app) {
    app.post('/upload', function (req, res) {

        // get file object from request
        var myFile = req.files.myFile;

        // path where file was written
        var path = myFile.path;

        // original file name
        var name = myFile.name;

        var size = myFile.size;
        var type = myFile.type;

        res.send(200);
    });
}
