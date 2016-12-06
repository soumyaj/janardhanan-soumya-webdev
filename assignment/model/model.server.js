module.exports = function() {

    var mongoose = require('mongoose');
    var connectionString = 'mongodb://localhost:27017/webappmaker';
    if(process.env.MLAB_DB_USERNAME) {
        connectionString = process.env.MLAB_DB_URL_INIT +
            process.env.MLAB_DB_USERNAME + ":" +
            process.env.MLAB_DB_PASSWORD +
            process.env.MLAB_DB_URL_END + '/' +
            process.env.MLAB_DB_NAME;
    }
    //mongoose.connect('mongodb://localhost/webappmaker');
    mongoose.connect(connectionString)
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