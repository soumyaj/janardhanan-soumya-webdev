(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController)
        .controller("WidgetChooserController", widgetChooserController)
        .controller("EditWidgetController", editWidgetController);

    function widgetListController($routeParams,WidgetService ,$sce) {

        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function (err) {
                    vm.error = "Service error fetching widgets";

                });
        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function checkSafeImageUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }
        init();
    }

    function editWidgetController(WidgetService, $routeParams, $sce, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.widgetId = parseInt($routeParams['wgid']);

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            console.log("Widget ID "+ vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    if (widget != '0') {
                        vm.widget = widget;
                        console.log(vm.widget)
                    }
                })
                .error(function (err) {
                    vm.error = "Service error finding widget";
                });
        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function updateWidget(widget) {
            console.log("Widget Type "+ widget.widgetType)
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .success(function(widget) {
                    console.log(widget)
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            })
                .error(function (err) {
                    vm.error = "Service error";
                    console.log(err)
                });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function(resp) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            })
            .error(function (err){
                vm.error = "Service error";
                console.log(err)
            });
        }
        init();
    }

    function widgetChooserController(WidgetService, $routeParams, $sce,$location) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);

        vm.createHeader = createHeader;
        vm.createHtml = createHtml;
        vm.createImage = createImage;
        vm.createYoutube = createYoutube;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function (err) {
                    vm.error = "Service error fetching widgets";
                });
        }

        function createHeader() {
            var widgetId = (new Date()).getTime().toString();
            var widget_object = { "_id": widgetId, "widgetType": "HEADER", "pageId": vm.pageId,
                "size": 4, "text": "New HEADER widget"};
            createWidget(widget_object)
            // WidgetService.createWidget(vm.pageId, widget_object);
            // $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+widgetId+"/");
        }

        function createHtml() {
            var widgetId = (new Date()).getTime().toString();
            var widget_object = { "_id": widgetId, "widgetType": "HTML", "pageId": vm.pageId, "text": "<p>New HTML widget</p>"};
            // WidgetService.createWidget(vm.pageId, widget_object);
            // $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+widgetId+"/");
            createWidget(widget_object)
        }

        function createImage() {
            var widgetId = (new Date()).getTime().toString();
            var widget_object = { "_id": widgetId, "widgetType": "IMAGE", "pageId": vm.pageId, "width": 100,
                "url": "", "name":"", "text":""};
            // WidgetService.createWidget(vm.pageId, widget_object);
            // $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+widgetId+"/");
            createWidget(widget_object)
        }

        function createYoutube() {
            var widgetId = (new Date()).getTime().toString();
            var widget_object = { "_id": widgetId, "widgetType": "YOUTUBE", "pageId": vm.pageId, "width": 100,
                "url": "" };
            // WidgetService.createWidget(vm.pageId, widget_object);
            // $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+widgetId+"/");
            createWidget(widget_object)
        }

        function createWidget(widgetObject) {
            console.log("Booo "+widgetObject._id)
            WidgetService
                .createWidget(vm.pageId, widgetObject)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/"
                        + vm.pageId + "/widget/"+widgetObject._id+"/");
            })
                .error(function (err) {
                    vm.error = "Service error fetching widgets";

                });
        }
        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }
        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        init();
    }

})();
