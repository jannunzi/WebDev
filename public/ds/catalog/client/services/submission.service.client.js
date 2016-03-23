/**
 * Created by ameyapandilwar on 3/10/16.
 */

(function () {
    "use strict";
    angular
        .module("CatalogApp")
        .factory("SubmissionService", SubmissionService);

    function SubmissionService() {
        var forms = [];

        forms = [
                    {"_id": "000", "title": "Contacts", "userId": 123},
                    {"_id": "010", "title": "ToDo",     "userId": 123},
                    {"_id": "020", "title": "CDs",      "userId": 234}
                ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id: new Date().getTime(),
                title: form.title,
                userId: userId
            };
            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for (var f in forms) {
                if (forms[f].userId == userId) {
                    userForms.push(forms[f]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            for (var f in forms) {
                if (forms[f]._id == formId) {
                    forms.splice(f, 1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var f in forms) {
                if (forms[f]._id == formId) {
                    forms[f] = {
                        _id: formId,
                        title: newForm.title,
                        userId: newForm.userId
                    };
                    break;
                }
            }
            callback(forms);
        }
    }
}());