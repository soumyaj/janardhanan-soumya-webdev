(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController)
        .controller("NewPageController", newPageController)
        .controller("EditPageController", editPageController);

    function pageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = parseInt($routeParams['uid']);

        function init() {
            vm.websites = PageService.findPageByWebsiteId(vm.websiteId);
            console.log(vm.websites)
        }
        init();


    }

    function newPageController(PageService, $location) {
        var vm = this;
        //vm.login = login;


    }

    function editPageController(PageService, $location) {
        var vm = this;
        //vm.login = login;


    }
})();
