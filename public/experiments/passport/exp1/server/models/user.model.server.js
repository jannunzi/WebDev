module.exports = function(mongoose)
{
    var UserSchema = new mongoose.Schema(
        {
            username:  String,
            password:  String,
            email:     String,
            firstName: String,
            lastName:  String,
            roles:     [String]
        }, {collection: "user"});

    var UserModel = mongoose.model("experiments.passport.exp1.user", UserSchema);

    return UserModel;
}