module.exports = function(mongoose){
    var LearningElement = require("./learningElement.schema.server.js")(mongoose);

    return mongoose.Schema({
        title: String,
        overview: String,
        learningElements: [LearningElement]
    });
}