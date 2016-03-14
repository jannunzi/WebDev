module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var MovieSchema = mongoose.Schema({
        imdbID: String,
        title: String,
        poster: String,
        // store movie documents in this collection
    }, {collection: 'project.omdb.movie'});

    return MovieSchema;

};