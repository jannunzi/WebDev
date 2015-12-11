module.exports = function(mongoose) {

    var Assignment = require("./assignment.schema.js")(mongoose);
    var Lecture = require("./lecture.schema.js")(mongoose);
    var Example = require("./example.schema.js")(mongoose);

    var moduleSchema = mongoose.Schema({
        title: String,
        available: Boolean,
        visible: Boolean,
        lectures: [Lecture],
        assignments: [Assignment],
        //videos: [
        //    {
        //        title: String,
        //        src: String,
        //        width: Number,
        //        height: Number
        //    }
        //],
        //slides: [
        //    {
        //        title: String,
        //        src: String,
        //        width: Number,
        //        height: Number
        //    }
        //],
        examples: [Example]


    });

    return moduleSchema;
}