module.exports = function(mongoose){

    var exampleSchema = mongoose.Schema(
        {
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

    return exampleSchema;
}