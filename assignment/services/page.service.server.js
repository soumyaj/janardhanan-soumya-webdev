module.exports = function(app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var page = req.body;
        pages.push(page);
        res.send(pages);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = parseInt(req.params.websiteId);
        var result = [];
        for(var p in pages) {
            if(parseInt(pages[p].websiteId) == wid) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    function findPageById(req,res) {
        var pageId = parseInt(req.params.pageId);
        for(var p in pages) {
            if(parseInt(pages[p]._id) === pageId) {
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = parseInt(req.params.pageId);
        for(var p in pages) {
            if(parseInt(pages[p]._id) == pageId) {
                pages[p] = page;
            }
        }
        res.send(200);
    }

    function deletePage(req,res) {
        var pageId = parseInt(req.params.pageId);
        for(var p in pages) {
            if(parseInt(pages[p]._id) == pageId) {
                pages.splice(p, 1);
            }
        }
        res.send(200);
    }
};