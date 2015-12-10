module.exports = function(mongoose) {

    var moduleSchema = mongoose.Schema({
        title: String,
        available: Boolean,
        visible: Boolean,
        lectures: [
            {
                title: String,
                overview: String
                //learningElements: [LearningElement]
            }
        ],
        assignments: [
            {
                title: String,
                src: String
            }
        ],
        videos: [
            {
                title: String,
                src: String,
                width: Number,
                height: Number
            }
        ],
        slides: [
            {
                title: String,
                src: String,
                width: Number,
                height: Number
            }
        ],
        examples: [
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
            }
        ]


    });

    return moduleSchema;
}