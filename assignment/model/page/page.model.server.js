module.exports = function() {

    var mongoose = require('mongoose');
    var PageSchema = require("./page.schema.server.js")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage :  updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model

    }

    function createPage(websiteId,page) {
        //page._website = websiteId;
        console.log("In page model server")
        console.log(websiteId)
        console.log(page._website)
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website : websiteId});
    }

    function  findPageById(pageId) {
        return Page.findById(pageId);
    }

    function updatePage(pageId, page) {
        delete page._id;
        return Page.update({_id: pageId },{
            $set: {
                name: page.name,
                title: page.title
            }
        });
    }

    function deletePage(pageId) {
        return Page.remove({_id : pageId});
    }
};
