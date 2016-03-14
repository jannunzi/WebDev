
var q = require("q");

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
        createMovie: createMovie,
        userLikesMovie: userLikesMovie
    };
    return api;

    function userLikesMovie (userId, movie) {

        var deferred = q.defer();

        // find the movie by imdb ID
        Movie.findOne({imdbID: movie.imdbID},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a movie
                if (doc) {
                    // add user to likes
                    doc.likes.push (userId);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no movie
                    // create a new instance
                    movie = new Movie({
                        imdbID: movie.imdbID,
                        title: movie.Title,
                        poster: movie.Poster,
                        likes: []
                    });
                    // add user to likes
                    movie.likes.push (userId);
                    // save new instance
                    movie.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
        });

        return deferred.promise;
    }

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
            title: movie.Title,
            likes: []
        });

        var deferred = q.defer();

        // save movie to database
        movie.save(function (err, doc) {

            if (err) {
                // reject promise if error
                defferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findMovieByImdbID(imdbID) {

        var deferred = q.defer();

        Movie.findById(imdbID, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
}