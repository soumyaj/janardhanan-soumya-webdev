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
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
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

        function init() {
            console.log("Widget ID "+ vm.widgetId);
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            console.log("Did i find it? "+vm.widget)
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
            WidgetService.updateWidget(vm.widgetId, widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
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

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        function createHeader() {
            var widgetId = (new Date()).getTime().toString();
            var widget_object = { "_id": widgetId, "widgetType": "HEADER", "pageId": vm.pageId, "size": 4, "text": "New HEADER widget"};
            WidgetService.createWidget(vm.pageId, widget_object);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function createHtml() {
            var widgetId = (new Date()).getTime().toString();
            var widget_object = { "_id": widgetId, "widgetType": "HTML", "pageId": vm.pageId, "text": "<p>New HTML widget</p>"};
            WidgetService.createWidget(vm.pageId, widget_object);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function createImage() {
            var widgetId = (new Date()).getTime().toString();
            var widget_object = { "_id": widgetId, "widgetType": "IMAGE", "pageId": vm.pageId, "width": "100%",
                "url": "http://lorempixel.com/400/200/", "name":"", "text":""};
            WidgetService.createWidget(vm.pageId, widget_object);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function createYoutube() {
            var widgetId = (new Date()).getTime().toString();
            var widget_object = { "_id": widgetId, "widgetType": "YOUTUBE", "pageId": vm.pageId, "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" };
            WidgetService.createWidget(vm.pageId, widget_object);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
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
