var mongoose = require("mongoose");
module.exports = function() {

    var WebsiteSchema = mongoose.Schema({

        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        developerId: String,
        name : String,
        description : String,
        //pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
        pages: [],
        dateCreated : {type : Date, default: Date.now}

    }, {collection: "assignment.website"});

    return WebsiteSchema;
};