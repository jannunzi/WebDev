module.exports = function (app) {
    var model = require("./models/movie.model.server.js")();
    var movieService = require("./services/movie.service.server.js")(app, model);
};