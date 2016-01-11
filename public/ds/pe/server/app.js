module.exports = function(app, db, mongoose) {
    var model = require("./models/page.model.js")(mongoose, db);
    require("./services/page.service.server.js")(app, model);
};