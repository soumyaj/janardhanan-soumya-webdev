(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController)
        .controller("NewPageController", newPageController)
        .controller("EditPageController", editPageController);

    function pageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                vm.pages = pages;
            })
        .error(function (err) {
                console.log("Service error retrieving pages");
                console.log(err);
            });
        }
        init();
    }

    function newPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.createPage = createPage;
        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (err) {
                    console.log("Service error retrieving pages");
                    console.log(err);
                })
        }
        init();

        function createPage(page) {
            page.websiteId = vm.websiteId;

            console.log(page);
            if (page.name) {
                PageService
                    .createPage(vm.websiteId,page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function (err) {
                        console.log("Service error creating page");
                        console.log(err);
                    })
            } else {
                vm.error = "Page name cannot be empty.";
            }
        }
    }

    function editPageController($routeParams,PageService,$location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (err) {
                    console.log("Error retrieving pages");
                    console.log(err);
                });
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
                .error(function (err) {
                    console.log("Error retrieving page");
                    console.log(err);
                });
        }
        init();

        function deletePage() {
            //console.log("In controller "+ vm.pageId)
            PageService.deletePage(vm.pageId)
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");

        }
    }
})();
