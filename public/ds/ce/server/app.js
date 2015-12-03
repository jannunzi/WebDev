module.exports = function(app, db, mongoose) {
    var courseModel = require("./models/course.model.js")(db, mongoose);
    require("./services/course.service.js")(app, courseModel);

};


