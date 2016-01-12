module.exports = function(mongoose){
    var LearningElementSchema = mongoose.Schema({

        title: String,
        type: {
            type: String,
            enum: [
                'PDF',
                'VIDEO',
                'SLIDE',
                'LINK',
                'HTML',
                'IFRAME'
            ]
        },
        src: String,
        height: Number,
        width: Number,
        html: String
    });
    return LearningElementSchema;
}