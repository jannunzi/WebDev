
var myLikes = [];

module.exports = function() {
    var api = {
        likes: likes,
        getLikes: getLikes,
        rate: rate,
        dislike: dislike,
        comment: comment
    };
    return api;

    function likes(idIMDB, movie) {
        myLikes.push({
            "idIMDB": idIMDB,
            "title": movie.title,
            "poster": movie.urlPoster
        });
    }
    function getLikes() {
        return myLikes;
    }
    function rate() {}
    function dislike() {}
    function comment() {}
}