module.exports = function(mongoose) {
    var CourseSchema = mongoose.Schema({
        userId: String,
        title: String
    }, {collection: "portal.course"});
    return CourseSchema;
};