// module.exports = function() {
//     var mongoose = require("mongoose");
//     var WebsiteSchema = require("./website.schema.server")();
//     var Website = mongoose.model("Website", WebsiteSchema);
//     var model = {}
//
//     var api = {
//         createWebsiteForUser: createWebsiteForUser,
//         findAllWebsitesForUser: findAllWebsitesForUser,
//         findWebsiteById: findWebsiteById,
//         updateWebsite: updateWebsite,
//         deleteWebsite: deleteWebsite,
//         setModel: setModel
//     };
//     return api;
//
//     function setModel(_model) {
//         model = _model
//     }
//
//     function createWebsiteForUserGood(userId, website) {
//         website._user =  userId;
//         return Website.create(website);
//     }
//
//
//     function createWebsiteForUser(userId, website) {
//         return Website
//             .create(website)
//             .then(
//                 function (newWebsite) {
//                     model
//                         .userModel
//                         .findUserById(userId)
//                         .then(
//                             function (user) {
//                                 user.websites.push(newWebsite);
//                                 newWebsite._user = user._id;
//                                 newWebsite.save();
//                                 return user.save();
//                             },
//                             function (error) {
//                             }
//                         );
//                 },
//                 function () {
//
//                 });
//     }
//
//     function createWebsiteForUser2(userId, website) {
//         //website._user = userId;
//
//         console.log("In model server");
//         console.log(userId);
//         console.log(website.name);
//
//         return Website
//             .create(website)
//             .then(function(websiteObj) {
//                     model.userModel
//                         .findUserById(userId)
//                         .then(function(userObj) {
//                             console.log(userObj);
//                                 console.log(userObj._id);
//                                 userObj.websites.push(websiteObj._id);
//                                 websiteObj._user = userObj._id;
//                                 userObj.save();
//                                 return websiteObj.save();
//                             },
//                             function(error){
//                                 console.log(error)
//                             });
//                 },
//                 function(error){
//                     console.log(error)
//                 }
//             );
//
//     }
//
//     function findAllWebsitesForUser(userId) {
//         console.log("Problem")
//         console.log(userId)
//         return Website
//             .find({developerId: userId});
//             //.populate("name","description")
//             //.exec();
//     }
//
//     function findWebsiteById(websiteId){
//         return Website.findById(websiteId);
//     }
//
//     function updateWebsite(websiteId, website) {
//         // Delete old first
//         delete website._id;
//         return Website
//             .update({_id: websiteId},{
//                 $set: {
//                     name: website.name,
//                     description: website.description
//                 }
//             });
//     }
//
//     function deleteWebsite(websiteId) {
//         return Website.remove({_id: websiteId});
//     }
//
// };


module.exports = function() {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function findWebsiteById(websiteId){
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        delete website._id;
        return Website
            .update({_id: websiteId },{
                $set: {
                    name: website.name,
                    description: website.description
                }
            });
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }

};