(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;

        function createWebsite(userId, website) {
            for(var w in websites) {
                current_website = websites[w];
                // Duplicate check
                if(website._id === current_website["_id"]) {
                    return null;
                }
            }
            if(website!=null) {
                website.developerId = userId;
                websites.push(website);
            } else {
                return null;
            }
        }

        function findWebsitesByUser(userId) {
            var output = []
            for(var w in websites) {
                curr_website = websites[w];
                if(parseInt(curr_website.developerId) === parseInt(userId)) {
                    output.push(curr_website);
                }
            }
            return output;

        }
        function findWebsiteById(websiteId)  {
            for(var w in websites) {
                website = websites[w];
                if(website._id === websiteId) {
                    return website;
                }
            }
            return null;

        }
        function updateWebsite(websiteId, website)  {
            for(var w in websites) {
                curr_website = websites[w];
                if(curr_website._id === websiteId) {
                    websites[w] = website;
                    break;
                }
            }
        }
        function deleteWebsite(websiteId) {
            console.log(" In service")
            console.log(websiteId)
            for(var w in websites) {
                curr_website = websites[w];
                if(curr_website._id === websiteId) {
                    websites.splice(w,1)
                    break;
                }
            }
            return null;
        }
    }
})();