module.exports = function(app){

    console.log("ewq");

    app.post("/checkout", checkout);

    function checkout(req, res) {
        var body = req.body;
        res.json(body);
    }
}