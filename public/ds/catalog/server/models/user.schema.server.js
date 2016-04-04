/**
 * Created by ameyapandilwar on 3/30/16.
 */

module.exports = function (mongoose) {
    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: [String],
        phones: [String]
    }, {collection: 'catalog.user'});
};