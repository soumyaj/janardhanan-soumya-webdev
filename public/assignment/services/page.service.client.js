(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);


    function pageService($http) {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,

        };

        return api;

        function createPage(websiteId, page) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.post(url, page);
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);
        }
        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            $http.put(url, page);
        }

        function deletePage(pageId) {

            var url = "/api/page/" + pageId;
            $http.delete(url);
        }
    }
})();