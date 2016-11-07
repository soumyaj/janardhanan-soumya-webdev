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
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            var url = "/api/page/"+pageId+"/widget";
            console.log(url)
            console.log(widget._id)
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId) {
            // output = []
            // for(var w in widgets) {
            //     curr_widget = widgets[w];
            //     if(parseInt(curr_widget.pageId) === parseInt(pageId)) {
            //          output.push(curr_widget);
            //     }
            // }
            // return output;
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url)
        }

        function findWidgetById(widgetId) {
            // for(var w in widgets) {
            //     curr_widget = widgets[w];
            //     if(parseInt(curr_widget._id) === parseInt(widgetId)) {
            //         return curr_widget;
            //     }
            // }
            // console.log("After if loop "+widgetId)
            // return null;
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url, widget);
        }
        function deleteWidget(widgetId) {

            // return null;
            var url = "/api/widget/"+widgetId;
            return $http.delete(url)
        }
    }
})();
