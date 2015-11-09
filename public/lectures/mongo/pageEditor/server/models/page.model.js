var q = require("q");

module.exports = function(mongoose, db){
    var PageSchema = mongoose.Schema({
        "label": String,
        "created": {type: Date, default: Date.now},
        "content": [{
            "contentType": {
                type: String,
                enum: ["HEADING","LABEL", "PARAGRAPH", "LIST", "FORM"]
            },
            "heading": {
                "size" : {type: Number, default:2},
                "content" : {type: String, default: "Heading"}
            },
            "label" : {
                "content" : {type: String, default: "Label"}
            },
            "paragraph" : {
                "content" : {type: String, default: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"}
            },
            "list" : {
                "listType" : {type: String, enum: ["ORDERED", "UNORDERED"], default: "ORDERED"},
                "items": [
                    "Item 1", "Item 2", "Item 3"
                ]
            },
            "form" : {
                "formId" : String
            }
        }]
    }, {collection: "lecture.mongo.pageEditor.pages"});

    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        addPage: addPage,
        getAllPages: getAllPages,
        getPageById: getPageById
    };
    return api;

    function getPageById(id) {
        var deferred = q.defer();

        PageModel.findById(id, function(err, page){
            deferred.resolve(page);
        });

        return deferred.promise;
    }

    function getAllPages() {
        var deferred = q.defer();

        PageModel.find(function(err, pages){
            deferred.resolve(pages);
        });

        return deferred.promise;
    }

    function addPage(page) {
        var deferred = q.defer();

        PageModel.create(page, function(err, doc){
            PageModel.find(function(err, pages){
                deferred.resolve(pages);
            });
        });

        return deferred.promise;
    }
};