module.exports = function(mongoose){

    var LearningElement = require("./learningElement.schema.js")(mongoose);
    var lectureSchema = mongoose.Schema({
        title: String,
        overview: String,
        learningElements: [LearningElement]
    });
    return lectureSchema;
}