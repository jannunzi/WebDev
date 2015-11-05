module.exports = function(app, db, mongoose){
    var FormModel = require("./models/form.model.js")(mongoose);
//    FormModel.createForm({name: "Form 234"});
//    FormModel.findAllForms(function(forms){
//        console.log(forms);
//    });
//  FormModel.findById("5636ccba2d09c48e25d81fb4")
//    FormModel.updateForm("5636ccba2d09c48e25d81fb4", {name: "Form abc"}, function(obj){
//        console.log(obj);
//        FormModel.findAllForms(function(forms){
//            console.log(forms);
//        });
//    });
    FormModel.deleteForm("5636ccba2d09c48e25d81fb4", function(stat){
        FormModel.findAllForms(function(forms){
            console.log(forms);
        });
    });
};
