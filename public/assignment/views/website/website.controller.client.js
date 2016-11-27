(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController)
        .controller("NewWebsiteController", newWebsiteController)
        .controller("EditWebsiteController", editWebsiteController);

    function websiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (err) {
                    console.log("Error fetching websites");
                    console.log(err);
                })
        }
        init();
    }

    function newWebsiteController($routeParams,WebsiteService,$location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function(websites) {
                    vm.websites = websites;
                })
                .error(function (err) {
                    console.log("Server Error fetching websites");
                    console.log(err);
                })
        }
        init();

        function createWebsite(website) {
            //website._id = (new Date()).getTime();
            //website.developerId = vm.userId;
            if(website.name) {
            WebsiteService
                .createWebsite(vm.userId,website)
                .success(function() {
                    $location.url("/user/"+vm.userId+"/website/")
                })
                .error(function(err) {
                    console.log("Error creating website. In newWebsiteController")
                    console.log(err)
                });
            }
            else {
                vm.error = "Website name cannot be empty.";
            }
        }
    }

    function editWebsiteController($routeParams,WebsiteService,$location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function(websites) {
                    vm.websites = websites;
                })
                .error(function (err) {
                    console.log("Error fetching websites");
                    console.log(err);
                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                })
                .error(function (err) {
                    console.log("Error fetching current website");
                    console.log(err);
                })
        }
        init();

        function updateWebsite(website) {
            console.log("Update "+ website)
            if (website.name) {
                WebsiteService.updateWebsite(vm.websiteId, website);
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Website name cannot be empty!";
            }
        }
        function deleteWebsite() {
            var status;
            WebsiteService.deleteWebsite(vm.websiteId)
            $location.url("/user/" + vm.userId + "/website")
        }
    }
})();
