/**
 * Created by ameyapandilwar on 3/30/16.
 */

module.exports = function (mongoose) {
    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        courses: [{
            number: String,
            title: String,
        }]
    }, {collection: 'catalog.user'});
};