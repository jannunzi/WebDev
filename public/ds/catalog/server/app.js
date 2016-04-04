/**
 * Created by ameyapandilwar on 3/8/16.
 */

module.exports = function(app, db, mongoose) {
    var courseModel = require("./models/course.model.js")();
    var userModel = require("./models/user.model.js")();

    var courseService = require("./services/course.service.server.js")(app, courseModel);
    var userService = require("./services/user.service.server.js")(app, userModel);
};