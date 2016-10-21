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

    function newPageController($routeParams, PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);

        function init() {

        }
        init();


    }

    function editPageController($routeParams,PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        function init() {
            vm.page = PageService.findPageById(vm.pageId);

            console.log(vm.page.name)
        }
        init();


    }
})();
