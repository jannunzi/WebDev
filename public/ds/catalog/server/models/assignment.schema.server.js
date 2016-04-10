module.exports = function(mongoose){
    return mongoose.Schema({
        number: Number,
        title: String,
        src: String
    });
}