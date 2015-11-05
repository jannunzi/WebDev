module.exports = function(app, db, mongoose) {
    var model = require("./models/script.model.js")(db, mongoose);
    var service = require("./services/script.service.js")(app, model);
};