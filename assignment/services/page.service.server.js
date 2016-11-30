module.exports = function (app, model) {

    // var pages = [
    //     {_id: "321", name: "Post 1", title: "Page 1", websiteId: "456"},
    //     {_id: "432", name: "Post 2", title: "Page 2", websiteId: "456"},
    //     {_id: "543", name: "Post 3", title: "Page 3", websiteId: "456"},
    //     {_id: "654", name: "Post 1", title: "Page 4", websiteId: "567"},
    //     {_id: "765", name: "Post 2", title: "Page 5", websiteId: "567"},
    //     {_id: "876", name: "Post 3", title: "Page 6", websiteId: "567"}
    // ];

    var pageModel = model.PageModel;

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId
        pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
        // page._id = (new Date()).getTime();
        // pages.push(page);
        // res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var pid = req.params.pageId;
        pageModel
            .findAllPagesForWebsite(pid)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
        // var result = [];
        // for (var p in pages) {
        //     if (pages[p]._id === pid) {
        //         result.push(pages[p]);
        //     }
        // }
        // res.json(result);
    }

    function findPageById(req, res) {
        var pid = req.params.pageId;
        pageModel
            .findPageById(pid)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
        // for (var p in pages) {
        //     if (pages[p]._id === pid) {
        //         res.send(pages[p]);
        //         return;
        //     }
        // }
        // res.send('0');
    }

    function updatePage(req, res) {
        var newPage = req.body;
        var pid = parseInt(req.params.pageId);

        pageModel
            .updatePage(pid, newPage)
            .then(
                function (page) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
        // for (var p in pages) {
        //     if (pages[p]._id === pid) {
        //         pages[p] = page;
        //     }
        // }
        // res.send(200);
    }

    function deletePage(req, res) {
        var pid = parseInt(req.params.pageId);

        pageModel
            .deletePage(pid)
            .then(
                function (page) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Cannot delete page");
                }
            )

        // for (var p in pages) {
        //     if (pages[p]._id === pid) {
        //         pages.splice(parseInt(p), 1);
        //     }
        // }
        // res.send(200);
    }
};