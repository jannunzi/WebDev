var applicationModel = require("./application.model.js")();

module.exports = function() {
    var api = {
        findPage: findPage,
        findAllPages: findAllPages,
        createPage: createPage,
        deletePage: deletePage,
        updatePage: updatePage
    };
    return api;

    function findPage(applicationId, pageId) {
        var application = applicationModel.findApplication(applicationId);
        for(var i=0; application.pages.length; i++) {
            if(application.pages[i].id === pageId) {
                return application.pages[i];
            }
        }
    }

    function findAllPages(applicationId) {
        var application = applicationModel.findApplication(applicationId);
        var pages = application.pages;
        return pages;
    }

    function createPage(applicationId, page) {
        var application = applicationModel.findApplication(applicationId);
        var pages = application.pages;
        pages.push(page);
        return pages;
    }

    function deletePage(applicationId, pageId) {
        var application = applicationModel.findApplication(applicationId);
        var pages = application.pages;
        for(var i=0; i<pages.length; i++) {
            if(pages[i].id === pageId) {
                pages.splice(i, 1);
                break;
            }
        }
        return pages;
    }

    function updatePage(applicationId, pageId, page) {
        pg = findPage(applicationId, pageId);
        pg.title = page.title;
        return findAllPages(applicationId);
    }
}