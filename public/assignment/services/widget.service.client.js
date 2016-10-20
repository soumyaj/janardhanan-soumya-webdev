(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);


    function widgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,

        };
        return api;

        function createWidget(pageId, widget)  {
            for(var w in widgets) {
                curr_widget = widgets[w];
                // Duplicate check
                if(widget._id === curr_widget[_id]) {
                    return null;
                }
            }
            if(user!=null) {
                widget.pageId = pageId
                widgets.push(widget)

            }
        }

        function findWidgetsByPageId(pageId) {
            for(var w in widgets) {
                curr_widget = widgets[w];
                if(curr_widget.pageId === pageId) {
                    return curr_widget;
                }
            }
            return null;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                curr_widget = widgets[w];
                if(curr_widget._id === widgetId) {
                    return curr_widget;
                }
            }
            return null;
        }
        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                curr_widget = widgets[w];
                if(curr_widget._id === widgetId) {
                    curr_widget = widget;
                }
            }
            return null;

        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                curr_widget = widgets[w];
                if(curr_widget._id === widgetId) {
                    widgets.splice(curr_widget,1);
                }
            }
            return null;
        }
    }
})();
