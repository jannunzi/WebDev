module.exports = function(app) {

    var files = [];

    app.post('/upload', function (req, res) {

        var myFile = req.files.myFile;

        // create local file object with relevant properties
        var file = {
            path: myFile.path,
            name: myFile.name,
            size: myFile.size,
            type: myFile.type
        }

        // store file object in some collection
        // or store in a database collection
        files.push(file);

        res.send(200);
    });
}
