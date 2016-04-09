module.exports = function(mongoose) {
    var Assignment = require("./assignment.schema.server.js")(mongoose);
    var Lecture = require("./lecture.schema.server.js")(mongoose);
    var Example = require("./example.schema.server.js")(mongoose);

    return mongoose.Schema({
        title: String,
        description: String,
        available: Boolean,
        visible: Boolean,
        lectures: [Lecture],
        assignments: [Assignment],
        examples: [Example]
    });
}