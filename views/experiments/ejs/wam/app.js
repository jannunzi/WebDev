module.exports = function(app, mongoose) {
    var pageModel = require("./models/page.model.js")(mongoose);
    require("./controllers/page.controller.js")(app, pageModel);
};
