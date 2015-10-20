module.exports = function(app) {
    console.log("werwer");
    app.get('/experiments/require/http/post123', function(req, res) {
        console.log(req.body);
        res.json(req.body);
    });
};
