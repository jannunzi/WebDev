
module.exports = function(app) {
    var model = require("./models/filter.model.js")();

    console.log("Filter Model");
    console.log(model);

    require("./services/filter.service.js")(app, model);
};
