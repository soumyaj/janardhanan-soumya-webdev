module.exports = function(app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        websites.push(website);
        res.send(websites);
    }

    function findAllWebsitesForUser(req, res) {
        var uid = parseInt(req.params.userId);
        var result = [];
        for(var w in websites) {
            if(parseInt(websites[w].developerId ) == uid) {
                result.push(websites[w]);
            }
        }

        res.json(result);
    }

    function findWebsiteById(req,res) {
        var websiteId = parseInt(req.params.websiteId);
        for(var w in websites) {
            if(parseInt(websites[w]._id) === websiteId) {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');

    }

    function updateWebsite(req,res) {
        var website = req.body;
        console.log(website)
        var websiteId = parseInt(req.params.websiteId);
        console.log(websiteId)
        for(var w in websites) {
            if(parseInt(websites[w]._id) === websiteId) {
                websites[w] = website;
                res.send(websites[w]);
                return;
            }
        }
        res.sendStatus('0');
    }

    function deleteWebsite(req,res) {
        var websiteId = parseInt(req.params.websiteId);
        for(var w in websites) {
            if(parseInt(websites[w]._id) === websiteId) {
                websites.splice(w, 1);
            }
        }
        res.sendStatus(200);
    }
};