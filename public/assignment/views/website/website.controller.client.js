(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController)
        .controller("NewWebsiteController", newWebsiteController)
        .controller("EditWebsiteController", editWebsiteController);

    function websiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

    function newWebsiteController($routeParams,WebsiteService,$location) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createWebsite(website) {
            website._id = (new Date()).getTime();
            //website.developerId = vm.userId;
            WebsiteService.createWebsite(vm.userId,website)
            $location.url("/user/"+vm.userId+"/website/")
        }
    }

    function editWebsiteController($routeParams,WebsiteService,$location) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId)

        }
        init();

        function updateWebsite(website) {
            if (website.name) {
                WebsiteService.updateWebsite(vm.websiteId, website);
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Website name cant be empty!";
            }

        }
        function deleteWebsite() {
            console.log("In controller "+ vm.websiteId)
            var status;
            status = WebsiteService.deleteWebsite(vm.websiteId)
            if(status === null) {
                vm.error = "Unable to delete website."
            }
        }
    }
})();
