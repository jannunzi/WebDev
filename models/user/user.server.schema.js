module.exports = function(mongoose) {

    var COLLECTION = "lectures.ejs.mongo.student";

    var UserSchema = new mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            roles: [String],
            gitHubUrl: String,
            openShiftUrl: String,
            phone: String,
            order: Number,
            smsSent: {type: Boolean, default: false},
        }, {collection: COLLECTION});

    return UserSchema;
};