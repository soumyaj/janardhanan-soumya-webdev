(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);


    function widgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidget: sortWidget
        };
        return api;

        function createWidget(pageId, widget) {
            var url = "/api/page/"+pageId+"/widget";
            console.log(url)
            console.log(widget._id);
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url)
        }

        function findWidgetById(widgetId) {

            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url, widget);
        }
        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url)
        }
        function sortWidget(pageId, start, end) {
            console.log("In sortWidget "+pageId)
            var url = "/page/"+pageId+"/widget?initial=START&final=END"
                    .replace("START",start)
                    .replace("END", end);
            return $http.put(url);
        }
    }

})();
