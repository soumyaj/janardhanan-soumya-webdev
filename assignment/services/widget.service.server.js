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
                res.status(404).send("No Widget found");
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