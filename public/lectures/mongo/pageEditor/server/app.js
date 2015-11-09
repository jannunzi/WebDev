module.exports = function(app, mongoose, db) {
    var model = require("./models/page.model.js")(mongoose, db);
    require("./services/page.service.server.js")(app, model);
};