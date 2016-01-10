module.exports = function(app, db, mongoose) {
    var model = require("./models/sheet.model.server.js")(db, mongoose);
    require("./services/sheet.service.server.js")(app, model);
    require("./services/cell.service.server.js")(app, model);
};