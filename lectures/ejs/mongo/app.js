module.exports = function(app, mongoose) {
    var StudentModel = require("./models/student.server.model.js")(mongoose);
    require("./routes/student.server.routes.js")(app, StudentModel);
};
