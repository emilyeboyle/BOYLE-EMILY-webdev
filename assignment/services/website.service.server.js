module.exports = function (app) {
    var websites = [
        {_id: 321, name: 'facebook.com', uid: 123},
        {_id: 432, name: 'wikipedia.org', uid: 123},
        {_id: 543, name: 'twitter.com', uid: 234}
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        websites.push(website);
        res.send(websites);
    }

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.userId;
        var result = [];
        for (var w in websites) {
            if (websites[w]._id == uid) {
                result.push(websites[w]);
            }
        }
        res.json(result);
    }

    function findWebsiteById(req, res) {
        var websiteId = parseInt(req.params.websiteId);
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = parseInt(req.params.websiteId);
        for (var w in websites) {
            if (websites[w]._id === wid) {
                websites[w] = website;
            }
        }
        res.send(200);
    }

    function deleteWebsite(req, res) {
        var wid = parseInt(req.params.websiteId);
        for (var w in websites) {
            if (websites[w]._id === wid) {
                websites.splice(parseInt(w), 1);
            }
        }
        res.send(200);
    }


};