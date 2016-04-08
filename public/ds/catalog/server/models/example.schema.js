module.exports = function(mongoose){
    return mongoose.Schema({
        title: String,
        demos: [
            {
                title: String,
                base: String,
                src: String,
                dependencies: [
                    {
                        title: String,
                        src: String
                    }
                ]
            }
        ]
    });
}