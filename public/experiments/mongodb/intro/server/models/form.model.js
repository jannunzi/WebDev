module.exports = function(mongoose) {

    var FormSchema = new mongoose.Schema({
        name: String
    }, {collection: "form"});

    var Form = mongoose.model("Form", FormSchema);

    var service = {
        findAllForms: findAllForms,
        findById: findById,
        createForm: createForm,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return service;

    function createForm(form, callback) {
        Form.create(form, function(err, obj){
            callback(obj);
        });
    }

    function findAllForms(callback) {
        Form.find(function(err, forms){
            callback(forms);
        });
    }

    function findById(id, callback) {
        Form.findById(id, function(err, form){
            callback(form);
        });
    }

    function updateForm(id, form, callback) {
        Form.update({_id: id}, {$set: form}, function (err, obj) {
            callback(obj);
        });
    }

    function deleteForm(id, callback) {
        Form.remove({_id: id}, function(err, stat){
            callback(stat);
        });
    }
};
