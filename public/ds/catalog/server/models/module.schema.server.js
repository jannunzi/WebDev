module.exports = function(mongoose) {

    //var Assignment = require("./assignment.schema.js")(mongoose);
    //var Lecture = require("./lecture.schema.js")(mongoose);
    //var Example = require("./example.schema.js")(mongoose);

    return mongoose.Schema({
        title: String,
        available: Boolean,
        visible: Boolean
        //lectures: [Lecture],
        //assignments: [Assignment],
        //examples: [Example]
    });

}