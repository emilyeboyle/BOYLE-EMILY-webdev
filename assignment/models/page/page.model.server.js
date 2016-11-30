module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;
    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findPageById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel.update(
            {_id: pageId},
            {
                $set: {
                    name: page.name,
                    title: page.title
                }
            }
        );
    }

    function deletePage(pageId) {
        return PageModel.remove({_id: pageId});
    }
};