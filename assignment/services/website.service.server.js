module.exports = function(app,model) {

    var websiteModel = model.websiteModel;
    //var userModel = model.userModel;
    
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsiteOld(req, res) {
        var website = req.body;
        console.log("In service server");
        console.log(website);
        var existingWebsites = websiteModel.findAllWebsitesForUser(uid);
        console.log(existingWebsites)
        var exist = false;

        if(existingWebsites.length ==0 ) {
            for(var w in existingWebsites) {
                if((existingWebsites[w].name) === website.name) {
                    exist = true;
                }}

        } else {
            if (exist === true) {
                res.status(500).send("Website already exists");
            }
            websiteModel
                .createWebsiteForUser(uid, website)
                .then(
                    function (newWebsite) {
                        res.json(newWebsite);
                    },
                    function (error) {
                        res.statusCode(500).send("Not able to create website");
                    });

            }
    }

    function createWebsite(req, res){
        var userId = req.params.userId;
        var website = req.body;
        website.developerId = userId;
        console.log("In service server")
        console.log(website)
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function(newWebsite) {
                    res.json(newWebsite);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        console.log("In service server find");
        console.log(userId)
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(existingWebsites) {
                    console.log("Existing");
                    console.log(existingWebsites);
                    res.json(existingWebsites);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateWebsite(req,res) {
        var website = req.body;
        console.log(website)
        var websiteId = req.params.websiteId;
        console.log(websiteId)

        websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    // function deleteWebsite(req,res) {
    //     var websiteId = req.params.websiteId;
    //
    //     websiteModel
    //         .findWebsiteById(websiteId)
    //         .then(
    //             function(existingWebsite){
    //                 if (existingWebsite !== null) {
    //                     websiteModel
    //                         .deleteWebsite(websiteId);
    //                 }
    //                 else {
    //                     res.status(500).send("Website not found")
    //                 }},
    //             function (error) {
    //                 res.sendStatus(400).send(error);
    //             });
    // }
    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (response) {
                res.send(200)
            }, function(err){
                res.status(400).send("Cannot delete Website");
            });

    }
};