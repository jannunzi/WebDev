module.exports = function(app, db, mongoose) {
    require("./services/course.service.js")(app, db, mongoose);

    var Schema = mongoose.Schema;

    var coursesSchema = new Schema({
        courses: [
            {
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
            }]
    });

};
