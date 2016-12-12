module.exports = function() {

    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);
    var model = {}

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    function setModel(_model) {
        model = _model
    }

    function createUser(user) {
        // TODO type validation
        return User.create(user);
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function updateUser(userId, user) {
        delete user._id;
        console.log("In model.server update user")
        console.log(user.email);
        console.log(userId);

        return User
            .update(
                {_id: userId},
                {$set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            });
    }


    function findUserByCredentials(username, password) {
        return User.findOne({username: username});
    }

    function findUserById(userId) {
        var user = User.find({_id: userId});
        return User.findOne({_id: userId});
    }

    function findUserByUsername(username){
        return User.findOne({username: username});
    }
    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }
};