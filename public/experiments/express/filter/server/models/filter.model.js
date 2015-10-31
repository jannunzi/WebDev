var data = require("./filter.data.mock.json");

module.exports = function(app) {
    var api = {
        getAllFilters: getAllFilters,
        getAllFiltersForId: getAllFiltersForId,
        getAllFiltersForClass: getAllFiltersForClass
    };
    return api;

    function getAllFilters() {
        return data;
    }

    function getAllFiltersForId(id) {
        id = parseInt(id);
        for(var i = 0; i < data.length; i++) {
            if(data[i].id === id) {
                return data[i];
            }
        }
    }

    function getAllFiltersForClass(className) {
        for(var i = 0; i < data.length; i++) {
            if(data[i]["class"] === className) {
                return data[i].filters;
            }
        }
    }
};
