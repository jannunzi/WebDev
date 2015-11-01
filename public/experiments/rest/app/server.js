module.exports = function(app) {
    var applicationModel = require("./model/application.model.js")();
    var pageModel = require("./model/page.model.js")();

    var applicationService = require("./service/application.service.js")(app, applicationModel);
    var pageService        = require("./service/page.service.js")(app, pageModel);

}
