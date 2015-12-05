module.exports = function(app, db, mongoose, passport, LocalStrategy) {
    var CourseModel = require("./models/course.server.model.js")(mongoose);
    require("./services/course.server.service.js")(app, CourseModel);

    require("./services/user.server.service.js")(app, db, mongoose, passport, LocalStrategy);
};