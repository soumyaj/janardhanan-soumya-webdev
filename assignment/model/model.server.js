module.exports = function() {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/webappmaker');

    // var mwebsiteModel = require("./website/website.model.server.js")();
    // var mwidgetModel = require("./widget/widget.model.server.js")();
    // var mpageModel = require("./page/page.model.server.js")();
    // var muserModel = require("./user/user.model.server.js")();
    var models;
    models = {

        websiteModel: require("./website/website.model.server.js")(),
        widgetModel: require("./widget/widget.model.server.js")(),
        pageModel: require("./page/page.model.server.js")(),
        userModel: require("./user/user.model.server.js")()

    };

    //userModel.setModel(models);
    // websiteModel.setModel(models);
    // pageModel.setModel(models);
    // widgetModel.setModel(models);
    return models;
};