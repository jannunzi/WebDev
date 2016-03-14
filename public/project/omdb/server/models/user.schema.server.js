module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        // imdb ids of movies this user likes
        likes: [String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.omdb.user'});
    return UserSchema;
};