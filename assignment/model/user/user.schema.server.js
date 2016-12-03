module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        websites: {type: mongoose.Schema.Types.ObjectId, ref: 'Website', default: []},
        facebook: {
            token: String,
            id: String,
            displayName: String
        },
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.user"});

    return UserSchema;
};