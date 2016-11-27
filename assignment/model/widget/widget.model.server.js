module.exports = function() {

    var mongoose = require('mongoose');
    var ObjectId =  require('mongodb').ObjectId;
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);
    var model = {}
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model
    }

    // function createWidget(pageId,widget) {
    //     console.log("In model server");
    //     console.log(pageId);
    //     return
    //     //Widget
    //         //.find({_page: pageId})
    //         //.then(function (allwidgets) {
    //          //   widget['priority'] = allwidgets.length;
    //         Widget.create(widget);
    //         //}, function (err) {
    //         //    console.log(err.message)
    //          //   return null;
    //        // });
    // }

    function createWidget(pageId, widget) {
        // widget._page = pageId;
        // return Widget.create(widget);
        widget._page = pageId;
        return Widget
            .find({_page: ObjectId(pageId)})
            .then(function (allwidgets) {
                widget['priority'] = allwidgets.length;
                return Widget.create(widget);
            }, function (err) {
                return null;
            });

    }



    function findAllWidgetsForPage(pageId){
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;

        return Widget.update({_id: widgetId },{
            $set: widget
        });

    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
    function reorderWidget(pageId, start, end){
        return Widget.find({"_page" : pageId})
            .then(
                function(widgets) {
                    widgets
                        .forEach(
                            function(widget){
                                if(start < end) {
                                    if (widget.priority > start && widget.priority <= end){
                                        widget.priority--;
                                        widget.save(function(){});

                                    } else if(widget.priority === start) {
                                        widget.priority = end;
                                        widget.save(function(){});
                                    }
                                } else {
                                    if (widget.priority < start && widget.priority >= end) {
                                        widget.priority++;
                                        widget.save(function(){});

                                    } else if (widget.priority === start ){
                                        widget.priority = end;
                                        widget.save(function(){});
                                    }
                                }
                            }
                        );
                },
                function(err) {
                    res.send(404);
                }
            );
    }

};