module.exports = function(mongoose){

    var AssignmentSchema = mongoose.Schema({
        title: String,
        src: String
    });
    return AssignmentSchema;
}