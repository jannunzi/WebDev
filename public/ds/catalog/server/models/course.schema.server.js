/**
 * Created by ameyapandilwar on 3/30/16.
 */

module.exports = function (mongoose) {

    var Module = require("./module.schema.server.js")(mongoose);

    return mongoose.Schema({
        number: String,
        title: String,
        timing: String,
        location: String,
        instructor: String,
        modules: [Module],
        users: [String]
    }, {collection: 'catalog.course'});
};