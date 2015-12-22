var q = require("q");

module.exports = function(mongoose, db){
    var PageSchema = mongoose.Schema({
        "label": String,
        "title": String,
        "created": {type: Date, default: Date.now},
        "content": [
            {
            "contentType": {
                type: String,
                enum: ["HEADING","LABEL", "PARAGRAPH", "LIST", "FORM", "BUTTON","TEXTAREA"]
            },
            "heading": {
                "size" : {type: String, default:"2"},
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
                "title": {type: String, default: "FORM"},
                "fields": [
                    {
                        "label": String,
                        "field": {type: String, enum: ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX", "SELECT", "DATE","BUTTON"]},
                        "options": [{label: String, value: String}],
                        "placeholder": String

                    }]
            },
            "button" : {
                "label" : {type:String, default: "BUTTON"}
            },
            "textarea":{
                "label" : {type:String,default:"TEXTAREA"},
                 "value" :{type:String}
            }

        }]
    }, {collection: "lecture.mongo.pageEditor.pages"});

    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        addPage: addPage,
        deletePage: deletePage,
        addContent: addContent,
        getAllPages: getAllPages,
        getPageById: getPageById,
        updatePageList: updatePageList,
        savePageContent: savePageContent,
        saveContent : saveContent,
        addFormToField: addFormToField,
        deleteContent : deleteContent,
        removefieldContent:removefieldContent,
        editfieldContent:editfieldContent,
        updateContentList:updateContentList
    };
    return api;

    function updateContentList(pageId)
    {


    }

    function editfieldContent(pageId, formId,fieldIndex)
    {
        var deferred = q.defer();

        PageModel.update({_id: pageId }, {$set: {content: page.content}},
            function(err, doc)
            {
                PageModel.findById(pageId, function(err, uPage){
                    deferred.resolve(uPage);
                });
            });
        return deferred.promise;

    }
    function removefieldContent(pageId, formId,fieldIndex)
    {
        console.log(pageId + " " + formId + " " + fieldIndex );
        var deferred = q.defer();
        PageModel.findById(pageId, function(err, page) {

            for(var i = 0; i<page.content.length; i++){
                if(page.content[i]._id == formId) {
                    page.content[i].form.fields.splice(fieldIndex, 1);
                    break;
                }
                }
            PageModel.update({_id: pageId }, {$set: {content: page.content}},
                function(err, doc)
                {
                    PageModel.findById(pageId, function(err, uPage){
                        deferred.resolve(uPage);
                    });
                });


        });
        return deferred.promise;
    }

    function deleteContent(pageId, contentIndex){
        var deferred = q.defer();
        PageModel.findById(pageId, function(err, page){
            page.content.splice(contentIndex, 1);
            PageModel.update({_id: pageId }, {$set: {content: page.content}},
                function(err, doc)
                {
                    PageModel.findById(pageId, function(err, uPage){
                        deferred.resolve(uPage);
                    });
                });
        });
        return deferred.promise;

    }

    function addFormToField(pageId, formId, field){
        var deferred = q.defer();
        var textField = {"label": "New Text Field", "field": "TEXT", "placeholder": "New Field"};
        var textAreaField = {"label": "New Text Field", "field": "TEXTAREA", "placeholder": "New Field"};
        var dateField = {"label": "New Date Field", "field": "DATE"};
        var dropDownField = {"label": "New Dropdown",
            "field": "SELECT", "options":
                [ {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"} ]};
        var checkBoxField = {"label": "New Checkboxes",
            "field": "CHECKBOX", "options":
                [ {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"} ]};
        var radioBoxField = {"label": "New Radio Buttons",
            "field": "RADIO", "options":
                [ {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"} ]};
        var buttonField = {"label" : "Button" ,"field": "BUTTON", "placeholder": "New Button"};



        PageModel.findById(pageId, function(err, page){
            console.log(page.content.length );
            for(var i = 0; i<page.content.length; i++){
                console.log(page.content[i]._id);
                if(page.content[i]._id == formId){
                    console.log("1123");
                    if(field.fieldType == "Single Line Text Field"){
                        page.content[i].form.fields.push(textField);
                        console.log("2");
                    }
                    else if(field.fieldType == "Multi Line Text Field"){
                        page.content[i].form.fields.push(textAreaField);
                        console.log("3");
                    }
                    else if(field.fieldType == "Date Field"){
                        page.content[i].form.fields.push(dateField);
                        console.log("4");
                    }
                    else if(field.fieldType == "Dropdown Field"){
                        page.content[i].form.fields.push(dropDownField);
                        console.log("5");
                    }
                    else if(field.fieldType == "CheckBoxes Field"){
                        page.content[i].form.fields.push(checkBoxField);
                        console.log("6");
                    }
                    else if(field.fieldType == "Radio Buttons Field"){
                        page.content[i].form.fields.push(radioBoxField);
                        console.log("7");
                    }
                    else if(field.fieldType == "Button Field"){
                        page.content[i].form.fields.push(buttonField);
                        console.log("7");
                    }
                }
            }
            console.log(page);
            page.save(function(err,doc){
               deferred.resolve(doc)
            });
        });

        return deferred.promise;
    }

    function addContent(pageId, contentType) {
        var deferred = q.defer();
            var textField = {"label": "New Text Field", "field": "TEXT", "placeholder": "New Field"};
            var textAreaField = {"label": "New Text Field", "field": "TEXTAREA", "placeholder": "New Field"};
            var dateField = {"label": "New Date Field", "field": "DATE"};
            var dropDownField = {"label": "New Dropdown",
                "field": "SELECT", "options":
                    [ {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"} ]};
            var checkBoxField = {"label": "New Checkboxes",
                "field": "CHECKBOX", "options":
                    [ {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"} ]};
            var radioBoxField = {"label": "New Radio Buttons",
                "field": "RADIO", "options":
                    [ {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"} ]};
            var buttonField = {"label" : "Button" ,"field": "BUTTON", "placeholder": "New Button"};


            PageModel.findById(pageId, function(err, page){
            var content = {
                contentType: contentType,
                list: {listType: 'ORDERED', items: ["Item 1", "Item 2", "Item 3"]},
                form:{fields:[textField,textAreaField,dateField,dropDownField,checkBoxField,radioBoxField,buttonField]}

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
    /*Update Page list order in the mdoel*/
    function updatePageList(pages)
    {
        PageModel.remove({}, function(err, content)
        {
            for(var i = 0; i < pages.length; i++)
            {
                PageModel.create(pages[i], function (err, doc) {});
            }
        });
    }
    /* Delete a page. */
    function deletePage(id)
    {
        var deferred = q.defer();

        PageModel.findById(id, function(err, doc)
        {
            doc.remove();
            PageModel.find(function(err, pages)
            {
                deferred.resolve(pages);
            });
        });

        return deferred.promise;
    }
    /* Save page title and label */
    function savePageContent(page)
    {
        var deferred = q.defer();

        PageModel.update({_id: page.id}, {$set: {label: page.label, title: page.title}},
        function(err, doc)
        {
            deferred.resolve();
        });
        return deferred.promise;
    }
    /* Save page title and label */
    function saveContent(page, content)
    {
        console.log(page);
        console.log(content);
        var deferred = q.defer();
        console.log("bfejcbejbajbjbdcjbsjdbjdsbn.")
        PageModel.findById(page.pageId,
        function(err, doc)
        {
            doc.content[page.contentIndex] = content;
            console.log(doc);
            PageModel.update({_id: page.pageId }, {$set: {content: doc.content}},
            function(err, doc)
            {
                   deferred.resolve(doc);
            });

        });
        return deferred.promise;
    }
};
