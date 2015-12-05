module.exports = function(mongoose){
    var CourseSchema = mongoose.Schema({
                title: String,
                modules: [{
                    title: String,
                    //overview: String,//html
                    available: Boolean,
                    visible: Boolean,
                    lectures: [
                        {
                            title: String
                            //overview: String,//html
                            //learningElements: [
                            //    {
                            //        elementType: {
                            //            type: String,
                            //            enum: [
                            //                'PDF',
                            //                'VIDEO',
                            //                'LINK',
                            //                'HTML',
                            //                'IFRAME'
                            //            ]
                            //        }
                            //    }
                            //]
                        }
                    ],
                    assignments: [
                        {
                            title: String,
                            link: String
                        }
                    ],
                    videos: [
                        {
                            title: String,
                            src: String
                            //width: String,
                            //height: String
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


                }]
            }, {collection: "ds.ce.course"});
    return CourseSchema;
}