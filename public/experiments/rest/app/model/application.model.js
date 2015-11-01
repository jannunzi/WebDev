var mock = require("./mock.json");

module.exports = function() {
    var api = {
        findApplication: findById,
        findAllApplications: findAll,
        createApplication: create,
        deleteApplication: remove,
        updateApplication: update
    };
    return api;

    function create(application) {
        mock.push(application);
        return mock;
    }

    function remove(id) {
        var application = findById(id);
        var idx = mock.indexOf(application);
        mock.splice(idx, 1);
        return mock;
    }

    function update(id, application) {
        var idx = mock.indexOf(findById(id));
        mock[idx].title = application.title;
        return mock;
    }

    function findAll() {
        return mock;
    }

    function findById(id) {
        for(var i=0; i<mock.length; i++) {
            if(mock[i].id == id) {
                return mock[i];
            }
        }
    }
};
