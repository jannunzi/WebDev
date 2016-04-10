module.exports = function(mongoose){
    return mongoose.Schema({
        number: Number,
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