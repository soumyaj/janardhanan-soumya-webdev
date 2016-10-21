(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);


    function pageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,

        };

        return api;

        function createPage(websiteId, page) {
            for(var p in pages) {
                curr_page = pages[p];
                if(curr_widget._id === widgetId) {
                    return curr_widget;
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            console.log(websiteId)
            var output = []
            for(var p in pages) {
                curr_page = pages[p];
                console.log(curr_page.websiteId)
                if(parseInt(curr_page.websiteId) === parseInt(websiteId)) {
                    output.push(curr_page);
                }
            }
            console.log(websiteId)
            return output;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                curr_page = pages[p];
                if(parseInt(curr_page._id) === parseInt(pageId)) {
                    return curr_page;
                }
            }
            return null;
        }
        function updatePage(pageId, page) {

        }

        function deletePage(pageId) {

        }
    }
})();