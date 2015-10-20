module.exports = function(app) {
    app.get('/experiments/require/http/get', function(req, res) {
        res.send('HTTP GET example');
    });

    app.get('/experiments/require/http/get/:id', function(req, res) {
        res.send(req.params.id);
        console.log(req.query.sample);
    });
};
