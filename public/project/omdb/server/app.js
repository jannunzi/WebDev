module.exports = function(app) {
    var userModel    = require("./models/user.model.server.js")();
    var userService  = require("./services/user.service.server.js")(app, userModel);
    var movieService = require("./services/movie.service.server.js")(app);
}
