(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);


    function widgetService($http) {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Header Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Header Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

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
            // for(var w in widgets) {
            //     curr_widget = widgets[w];
            //     if(parseInt(curr_widget._id) === parseInt(widgetId)) {
            //         curr_widget = widget;
            //         break;
            //     }
            // }
            var url = "/api/widget/"+widgetId;
            $http.put(url, widget);
        }
        function deleteWidget(widgetId) {
            // for(var w in widgets) {
            //     curr_widget = widgets[w];
            //     if(curr_widget._id === widgetId) {
            //         widgets.splice(parseInt(w),1);
            //     }
            // }
            // return null;
            var url = "/api/widget/"+widgetId;
            return $http.delete(url)
        }
    }
})();
