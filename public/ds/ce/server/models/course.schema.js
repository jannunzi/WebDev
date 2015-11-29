module.exports = function(mongoose){
    var CourseSchema = mongoose.Schema({
                title: String,
                modules: [{
                    title: String,
                    available: Boolean,
                    visible: Boolean,
                    lectures: [
                        {
                            title: String
                        }
                    ],
                    assignments: [
                        {
                            title: String
                        }
                    ],
                    videos: [
                        {
                            title: String,
                            src: String
                        }
                    ],
                    slides: [
                        {
                            title: String,
                            src: String
                        }
                    ],
                    examples: [
                        {
                            title: String,
                            ex: [
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


                }]
            }, {collection: "ds.ce.course"});
    return CourseSchema;
}