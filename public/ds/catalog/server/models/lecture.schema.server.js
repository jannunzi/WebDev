module.exports = function(mongoose){
    var LearningElement = require("./learningElement.schema.server.js")(mongoose);

    return mongoose.Schema({
        number: Number,
        title: String,
        overview: String,
        learningElements: [LearningElement]
    });
}