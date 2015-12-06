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
                "items": [String]
            },
            "form" : {
                "formId" : String
            }
        }]
    }, {collection: "ds.pageEditor.pages"});

    var Page = mongoose.model("Page", PageSchema);

    var api = {
        addPage: addPage,
        addContent: addContent,
        getAllPages: getAllPages,
        getPageById: getPageById
    };
    return api;

    function addContent(pageId, contentType) {
        var deferred = q.defer();

        Page.findById(pageId, function(err, page){
            var content = {
                contentType: contentType,
                list: {listType: 'ORDERED', items: ["Item 1", "Item 2", "Item 3"]}
            };
            page.content.push(content);
            page.save(function(err, doc){
                deferred.resolve(doc);
            });
        });

        return deferred.promise;
    }

    function getPageById(id) {
        var deferred = q.defer();

        Page.findById(id, function(err, page){
            deferred.resolve(page);
        });

        return deferred.promise;
    }

    function getAllPages() {
        var deferred = q.defer();

        Page.find(function(err, pages){
            deferred.resolve(pages);
        });

        return deferred.promise;
    }

    function addPage(page) {
        var deferred = q.defer();

        Page.create(page, function(err, doc){
            Page.find(function(err, pages){
                deferred.resolve(pages);
            });
        });

        return deferred.promise;
    }

    /* Edit a page's label. */
    function updatePageLabel(page)
    {
        var deferred = q.defer();
        Page.update({_id: page.id}, {$set: {label: page.label}}, function(err, doc)
        {
            Page.find(function(err, pages)
            {
                deferred.resolve();
            });
        });
        return deferred.promise;
    }

    /* Delete a page. */
    function deletePage(page)
    {
        var deferred = q.defer();
        Page.remove({_id: page.id}, function(err, doc)
        {
            Page.find(function(err, pages)
            {
                deferred.resolve();
            });
        });
        return deferred.promise;
    }
};