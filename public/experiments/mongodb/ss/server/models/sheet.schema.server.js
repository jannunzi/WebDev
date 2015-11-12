
module.exports = function(mongoose) {

    var IfSchema = mongoose.Schema({
        operation: {
            type: String,
            enum: ["EQ", "NEQ", "LT", "LTE", "GT", "GTE"]
        },
        inputCell1: String,
        inputCell2: String,
        thenCell: String,
        elseCell: String
    });

    var ArithmeticSchema = mongoose.Schema({
        operation: {
            type: String,
            enum: ["ADD", "SUB", "TIMES", "DIVISION"]
        },
        inputCell1: String,
        inputCell2: String
    });

    var SheetSchema = mongoose.Schema({
        name: String,
        cells: [
            {
                label: String,
                literal: String,
                reference: String,
                if: IfSchema,
                arithmetic: ArithmeticSchema
            }
        ]
    }, {collection: "experiments.mongodb.ss.sheet"});

    return SheetSchema;
};
