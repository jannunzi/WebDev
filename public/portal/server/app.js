module.exports = function(app, db, mongoose) {
    var model   = require("./models/course.model.server.js")(db, mongoose);
    var service = require("./services/course.service.server.js")(app, model);
};
