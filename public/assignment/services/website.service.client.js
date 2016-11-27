(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;

        function createWebsite(userId, website) {
            console.log("In client service")
            console.log(userId)
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website"
            console.log(url)
            return $http.get(url);
        }
        function findWebsiteById(websiteId)  {
            var url = "/api/website/"+websiteId
            return $http.get(url);
        }
        function updateWebsite(websiteId, website)  {
            var url = "/api/website/" + websiteId;
            $http.put(url, website);

        }
        function deleteWebsite(websiteId) {
            var url = "/api/website/"+websiteId;
            $http.delete(url);
        }
    }
})();