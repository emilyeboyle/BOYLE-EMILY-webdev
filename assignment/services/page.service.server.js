module.exports = function (app) {

    var pages = [
        {_id: "321", name: "Post 1", title: "Page 1", websiteId: "456"},
        {_id: "432", name: "Post 2", title: "Page 2", websiteId: "456"},
        {_id: "543", name: "Post 3", title: "Page 3", websiteId: "456"},
        {_id: "654", name: "Post 1", title: "Page 4", websiteId: "567"},
        {_id: "765", name: "Post 2", title: "Page 5", websiteId: "567"},
        {_id: "876", name: "Post 3", title: "Page 6", websiteId: "567"}
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var page = req.body;
        page._id = (new Date()).getTime();
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var pid = parseInt(req.params.pageId)
        var result = [];
        for (var p in pages) {
            if (pages[p]._id === pid) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    function findPageById(req, res) {
        var pid = parseInt(req.params.pageId);
        for (var p in pages) {
            if (pages[p]._id === pid) {
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function updatePage(req, res) {
        var page = req.body;
        var pid = parseInt(req.params.pageId);
        for (var p in pages) {
            if (pages[p]._id === pid) {
                pages[p] = page;
            }
        }
        res.send(200);
    }

    function deletePage(req, res) {
        var pid = parseInt(req.params.pageId);
        for (var p in pages) {
            if (pages[p]._id === pid) {
                pages.splice(parseInt(p), 1);
            }
        }
        res.send(200);
    }
};