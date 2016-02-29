module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function findUserByCredentials(credentials) {
        console.log(credentials);
    }
}