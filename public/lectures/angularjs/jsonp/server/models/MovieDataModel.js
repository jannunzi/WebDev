var mock = require("../data/mock.json");

module.exports = function() {
    var api = {
        findAllUsers : findAllUsers,
        findUseById : findUseById,
        findAllMoviesFodUser : findAllMoviesFodUser,
        userLikesMovie : userLikesMovie
    };
    return api;

    function findAllUsers() {
        return mock;
    }

    function findUseById(id) {
        for(var i=0; i<mock.length; i++) {
            if(mock[i].id === id) {
                return mock[i];
            }
        }
    }

    function userLikesMovie(userId, idIMDB) {
        var user = findUseById(userId);
        user.likes.push({'idIMDB' : idIMDB});
    }

    function findAllMoviesFodUser() {

    }
};

