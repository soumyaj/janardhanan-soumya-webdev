(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController)
        .controller("NewPageController", newPageController)
        .controller("EditPageController", editPageController);

    function pageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            console.log(vm.pages)
        }
        init();


    }

    function newPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);

        vm.createPage = createPage;
        function init() {

        }
        init();

        function createPage(page) {
            page._id = (new Date()).getTime();
            //website.developerId = vm.userId;
            console.log(page);
            PageService.createPage(vm.websiteId,page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page")
        }


    }

    function editPageController($routeParams,PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.deletePage = deletePage;

        function init() {
            vm.page = PageService.findPageById(vm.pageId);
            console.log(vm.page.name)
        }
        init();

        function deletePage() {
            console.log("In controller "+ vm.pageId)
            var status;
            status = PageService.deletePage(vm.pageId)
            if(status === null) {
                vm.error = "Unable to delete page."
            }
        }
    }
})();
