module.exports = function(app, db, mongoose) {
    var model = require("./models/course.model.js")(db, mongoose);
    require("./services/course.service.js")(app, model);


};
