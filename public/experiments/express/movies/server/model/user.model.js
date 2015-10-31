var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUser: findUser,
        findUserById: findUserById,
        userLikesMovie: userLikesMovie
    };
    return api;

    function userLikesMovie(userId, idIMDB) {
        var user = findUserById(userId);
        if(user != null) {
            if(user.likes) {
                if(user.likes.indexOf(idIMDB) === -1)
                    user.likes.push(idIMDB);
            } else {
                user.likes = [idIMDB];
            }
            return user;
        }
        return null;
    }

    function findUserById(userId) {
        userId = parseInt(userId);
        for(var i in mock) {
            if(mock[i].id === userId) {
                return mock[i];
            }
        }
        return null;
    }

    function findUser(username, password) {
        for(var i in mock) {
            if(mock[i].username === username && mock[i].password === password) {
                return mock[i];
            }
        }
        return null;
    }
};
