module.exports = function(mongoose){

    //var LearningElement = require('./learningElement.schema.js')(mongoose);
    var Module = require('./module.schema.js')(mongoose);
    var CourseSchema = mongoose.Schema({
                title: String,
                overview: String,
                modules: [Module]
            }, {collection: "ds.ce.course"});
    return CourseSchema;
}