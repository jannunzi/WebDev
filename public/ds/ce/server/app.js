module.exports = function(app, db, mongoose) {
    require("./services/course.service.js")(app, db, mongoose);
};
