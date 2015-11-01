
module.exports = function(app) {
    var userModel = require("./../model/user.model.js")();

    app.post("/api/example/express/movies/login", login);
    app.post("/api/example/express/movies/user/:userId/movie/:idIMDB/like", like)
    app.get("/api/example/express/movies/user/:userId/likes", getLikes)

    function getLikes(req, res) {
        var userId = req.param.userId;
        var user = userModel.findUserById(userId);
        var likes = user.likes;
        res.send(likes);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUser(credentials.username, credentials.password);
        res.json(user);
    }

    function like(req, res) {
        var userId = req.params.userId;
        var idIMDB = req.params.idIMDB;
        var user = userModel.userLikesMovie(userId, idIMDB);
        res.json(user);
    }
};
