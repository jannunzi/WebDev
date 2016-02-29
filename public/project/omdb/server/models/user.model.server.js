var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function findUserByCredentials(credentials) {
        console.log(mock);
        console.log(credentials);
    }
}