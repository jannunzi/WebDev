var q = require("q");

module.exports = function(mongoose) {

    var HeadingSchema = mongoose.Schema({
        content: {type: String, default: "Heading"},
        size: {type: Number, default: 2}
    });

    var LabelSchema = mongoose.Schema({
        content: {type: String, default: "Label"},
        forInput: {type: String, default: "some-input-id"}
    });

    var WidgetSchema = mongoose.Schema({
        widgetType: {type: String, enum: ["Heading"]},
        heading: HeadingSchema,
        label: LabelSchema
    });

    var PageSchema = mongoose.Schema({
        title: String,
        widgets: [WidgetSchema]
    }, {collection: "experiments.ejs.wam.page"});

    var PageModel = mongoose.model("PageModelEjs", PageSchema);
    var WidgetModel = mongoose.model("WidgetModelEjs", WidgetSchema);
    var HeadingModel = mongoose.model("HeadingModelEjs", HeadingSchema);
    var LabelModel = mongoose.model("LabelModelEjs", LabelSchema);

    var api = {
        createPage: createPage,
        getAllPages: getAllPages,
        getPage: getPage,
        createWidget: createWidget,
        updatePage: updatePage
    };
    return api;

    function updatePage(pageId, newPage) {
        var deferred = q.defer();

        PageModel.update({_id: pageId}, {$set: newPage}, function(err, page){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(page);
            }
        });

        return deferred.promise;
    }

    function createWidget(pageId, widget) {
        var deferred = q.defer();

        if(widget.widgetType == "Heading") {
            widget.heading = new HeadingModel();
        } else if(widget.widgetType == "Label") {
            widget.label = new LabelModel();
        }

        PageModel.findById(pageId, function(err, page){
            page.widgets.push(widget);
            page.save(function(err, page){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(page);
                }
            });
        });

        return deferred.promise;
    }

    function getPage(id) {
        var deferred = q.defer();

        PageModel.findById(id, function(err, page){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(page);
            }
        });

        return deferred.promise;
    }
    function getAllPages() {
        var deferred = q.defer();

        PageModel.find(function(err, pages){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(pages);
            }
        });

        return deferred.promise;
    }

    function createPage(page) {
        var deferred = q.defer();

        PageModel.create(page, function(err, newPage){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newPage);
            }
        });

        return deferred.promise;
    }
}