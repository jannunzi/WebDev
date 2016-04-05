/**
 * Created by ameyapandilwar on 3/30/16.
 */

module.exports = function (mongoose) {
    return mongoose.Schema({
        number: String,
        title: String,
        timing: String,
        location: String,
        modules: [String]
    }, {collection: 'catalog.course'});
};