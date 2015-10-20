module.exports = function(app) {
    app.get("/experiments/express/require/hello", function(req, res){
        res.send("Hello World from Experiments!");
    });
};
