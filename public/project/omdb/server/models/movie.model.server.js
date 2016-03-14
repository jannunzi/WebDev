// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load movie schema from movie model
    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    // create movie from schema
    var Movie  = mongoose.model("Movie", MovieSchema);

    var movies = [];
    var api = {
        findMovieByImdbID: findMovieByImdbID,
        findMoviesByImdbIDs: findMoviesByImdbIDs,
        createMovie: createMovie
    };
    return api;

    function findMoviesByImdbIDs (imdbIDs) {
        var movies = [];
        for (var id in imdbIDs) {
            var movie = findMovieByImdbID (imdbIDs[id]);
            if (movie) {
                movies.push({
                    _id: movie._id,
                    title: movie.title,
                    poster: movie.poster,
                    imdbID: movie.imdbID
                });
            }
        }
        return movies;
    }

    function createMovie(movie) {

        // create instance of movie
        var movie = new Movie({
            imdbID: movie.imdbID,
            poster: movie.Poster,
            title: movie.Title
        });

        // save movie to database
        Movie.save(function (err, doc) {
            console.log(doc);
        });
    }

    function findMovieByImdbID(imdbID) {
        for(var m in movies) {
            if(movies[m].imdbID === imdbID) {
                return movies[m];
            }
        }
        return null;
    }
}