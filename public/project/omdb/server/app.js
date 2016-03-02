module.exports = function(app) {
    var userModel    = require("./models/user.model.server.js")();
    var movieModel   = require("./models/movie.model.server.js")();

    var userService  = require("./services/user.service.server.js") (app, movieModel, userModel);
    var movieService = require("./services/movie.service.server.js")(app, movieModel, userModel);
}
