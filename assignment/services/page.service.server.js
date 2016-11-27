// module.exports = function(app,model) {
//
//     var pageModel = model.pageModel;
//
//     app.post('/api/website/:websiteId/page', createPage);
//     app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
//     app.get('/api/page/:pageId', findPageById);
//     app.put('/api/page/:pageId', updatePage);
//     app.delete('/api/page/:pageId', deletePage);
//
//
//     function createPage(req, res) {
//         var websiteId = req.params.websiteId;
//         var page = req.body;
//         console.log("In page service server")
//         console.log(page.websiteId)
//         pageModel
//             .createPage(websiteId,page)
//             .then(
//                 function(newPage) {
//                     res.json(newPage);
//                 },
//                 function(error) {
//                     res.statusCode(404).send(error);
//                 }
//             );
//     }
//
//     function findAllPagesForWebsite(req, res) {
//         var wid = req.params.websiteId;
//
//         console.log("In service server find");
//         console.log(wid)
//
//         pageModel
//             .findAllPagesForWebsite(wid)
//             .then(
//                 function(existingPages) {
//                     console.log("Existing");
//                     console.log(existingPages);
//                     res.json(existingPages);
//                 },
//                 function(error) {
//                     res.statusCode(404).send(error);
//                 }
//             );
//     }
//
//     function findPageById(req,res) {
//         var pageId = req.params.pageId;
//         pageModel
//             .findPageById(pageId)
//             .then(
//                 function(page) {
//                     res.json(page);
//                 },
//                 function(error) {
//                     res.statusCode(404).send(error);
//                 }
//             );
//     }
//
//     function updatePage(req, res) {
//         var page = req.body;
//         var pageId = req.params.pageId;
//         // Delete old first
//         delete page._id;
//         return pageModel
//             .update({_id: pageId},{
//                 $set: {
//                     name: page.name,
//                     title: page.title
//                     //description: page.description
//                 }
//             });
//     }
//
//     function deletePage(req,res) {
//         var pageId = req.params.pageId;
//         pageModel
//             .findPageById(pageId)
//             .then(
//                 function(existingPage){
//                     if (existingPage !== null) {
//                         pageModel
//                             .deletePage(pageId);
//                     }
//                     else {
//                         res.status(500).send("Page not found")
//                     }},
//                 function (error) {
//                     res.sendStatus(400).send(error);
//                 });
//     }
// };

module.exports = function(app, models){

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        page['_website'] = websiteId;

        pageModel
            .createPage(websiteId,page)
            .then(function (newPage) {
                res.json(newPage);
            },
                function (error) {
                res.status(500).send("Not able to create page");
            });
    }


    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function(err){
                res.status(400).send("Not page found");
            });

    }

    function findPageById(req, res){
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function updatePage(req, res){
        var pageId = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(pageId, page)
            .then(function (response) {
                res.send(200);
            }, function(err) {
                res.status(400).send("Cannot update the page");
            });
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (response) {
                res.send(200);
            }, function (err) {
                res.status(400).send("Cannot delete Page");
            });

    }
};