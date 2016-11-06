(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //         { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        //         { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        //         { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        //         { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        //         { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        //         { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        //     ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;

        function createWebsite(userId, website) {
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);
        }

        function findWebsitesByUser(userId) {
            // var output = []
            // for(var w in websites) {
            //     curr_website = websites[w];
            //     if(parseInt(curr_website.developerId) === parseInt(userId)) {
            //         output.push(curr_website);
            //     }
            // }
            // return output;

            var url = "/api/user/"+userId+"/website"
            return $http.get(url);
        }
        function findWebsiteById(websiteId)  {
            // for(var w in websites) {
            //     website = websites[w];
            //     if(parseInt(website._id) === websiteId) {
            //         return website;
            //     }
            // }
            // return null;
            var url = "/api/website/"+websiteId
            return $http.get(url);
        }
        function updateWebsite(websiteId, website)  {
            // for(var w in websites) {
            //     curr_website = websites[w];
            //     if(parseInt(curr_website._id) === websiteId) {
            //         websites[w] = website;
            //         break;
            //     }
            // }

            var url = "/api/website/" + websiteId;
            $http.put(url, website);

        }
        function deleteWebsite(websiteId) {
            // console.log(" In service")
            // console.log(websiteId)
            // for(var w in websites) {
            //     curr_website = websites[w];
            //     if(parseInt(curr_website._id) === websiteId) {
            //         websites.splice(w,1)
            //         break;
            //     }
            // }
            // return null;
            var url = "/api/website/"+websiteId;
            $http.delete(url);
        }
    }
})();