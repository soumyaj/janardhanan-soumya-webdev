// module.exports = function(app) {
//     var mime = require('mime');  // npm install mime --save
//     var multer = require('multer'); // npm install multer --save
//
//     var storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, __dirname+'/../../public/assignment/uploads')
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
//         }
//     });
//     var upload = multer({ storage: storage });
//
//     var widgets = [
//         { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
//         { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Header Lorem ipsum"},
//         { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": 100,
//             "url": "http://lorempixel.com/400/200/"},
//         { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//         { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Header Lorem ipsum"},
//         { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": 100,
//             "url": "https://youtu.be/AM2Ivdi9c4E" },
//         { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
//     ];
//     app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
//     app.post("/api/page/:pageId/widget", createWidget);
//     app.get("/api/widget/:widgetId", findWidgetById);
//     app.put("/api/widget/:widgetId", updateWidget);
//     app.delete("/api/widget/:widgetId", deleteWidget);
//     app.post ("/api/upload", upload.single('myFile'), uploadImage);
//     app.put("/page/:pid/widget", sortWidgets);
//
//
//
//     function findAllWidgetsForPage(req, res) {
//         var pid = parseInt(req.params.pageId);
//         var result = [];
//         for(var w in widgets) {
//             if(parseInt(widgets[w].pageId) === pid) {
//                 result.push(widgets[w]);
//             }
//         }
//         res.json(result);
//     }
//
//     function createWidget(req, res) {
//         var widget = req.body;
//         widgets.push(widget);
//         res.send(widget);
//     }
//
//     function findWidgetById(req, res) {
//         var widgetId = parseInt(req.params.widgetId);
//         for(var w in widgets) {
//             if(parseInt(widgets[w]._id) === widgetId) {
//                 res.send(widgets[w]);
//                 return;
//             }
//         }
//         res.send('0');
//     }
//
//     function updateWidget(req, res) {
//         var widgetId = parseInt(req.params.widgetId);
//         var widget = req.body;
//         for(var w in widgets) {
//             curr_widget = widgets[w];
//             if(parseInt(curr_widget._id) === parseInt(widgetId)) {
//                 curr_widget = widget;
//                 res.send(curr_widget)
//                 return;
//             }
//         }
//         res.send('0');
//     }
//     function deleteWidget(req, res) {
//         var widgetId = parseInt(req.params.widgetId);
//         for(var w in widgets) {
//             curr_widget = widgets[w];
//             if(parseInt(curr_widget._id) === widgetId) {
//                 widgets.splice(parseInt(w),1);
//             }
//         }
//         res.send('0');
//     }
//
//     function uploadImage(req, res) {
//
//         var widgetId      = req.body.widgetId;
//         var userId        = req.body.userId;
//         var websiteId     = req.body.websiteId;
//         var pageId        = req.body.pageId;
//         var widget        = getWidgetById(widgetId);
//
//         //get the widget's attributes
//         var width         = req.body.width;
//         var name          = req.body.name;
//         var text          = req.body.text;
//
//         var metadata = {
//             originalname    : req.file.originalname, // file name on user's computer
//             filename        : req.file.filename,     // new file name in upload folder
//             fullPath        : req.file.path,         // full path of uploaded file
//             size            : req.file.size,
//             mimeType        : req.file.mimetype
//         };
//
//         var url = "uploads/"+metadata.filename;
//         widget.url = url;
//
//         widget.width = width;
//         widget.name = name;
//         widget.text = text;
//         widget.metadata = metadata;
//         widget = updateWidgetById(widgetId, widget);
//
//         if(widget)
//             res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
//         else res.redirect("back");
//     }
//
//     function sortWidgets(req, res) {
//         var pid = req.params.pageId;
//         var initial = parseInt(req.query.initial);
//         var final   = parseInt(req.query.final);
//         if(initial===final) {
//             res.sendStatus(200);
//             return;
//         }
//         widgets.splice(final,0,widgets.splice(start,1)[0]);
//     }
//
// };

module.exports = function(app, models) {

    var widgetModel = models.widgetModel;
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget", reorderWidget);


    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);


        if (!isNaN(start) && !isNaN(end)) {
            if (start !== end) {
                widgetModel
                    .reorderWidget(pageId, start, end)
                    .then(function (response) {
                            res.send(200);
                        }, function (err) {
                            res.status(400).send(err);
                        }
                    );
            } else {
                res.send(200);
            }
        }
    }



    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var pageId = req.body.pageId;
        var userId = req.body.userId;
        var websiteId = req.body.userId;

        var width = req.body.width;
        var myFile = req.file;
        var redirecturl = "/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/" + widgetId;

        if(myFile) {

            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            var widget = {url: "/uploads/" + filename} ;

            widgetModel.updateWidget(widgetId, widget).then(function (response) {
                res.redirect(redirecturl);
            }, function (err) {
                res.redirect(redirecturl);
            });

        } else {
            res.redirect(redirecturl);
        }
    }


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget['_page'] = pageId;
        widgetModel
            .createWidget(pageId, widget)
            .then(function(newWidget) {
                    res.json(newWidget);
                    console.log("New Widget");
                    console.log(newWidget);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.status(404).send("No Website found");
            });

    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function(err){
                res.status(404).send(err);
            });
    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (response) {
                res.send(200);
            }, function (err) {
                res.status(400).send("Not able to update widget");
            });

    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(function (response) {
                res.send(200);
            }, function(err){
                res.status(400).send("Not able to delete widget")
            });
    }

};