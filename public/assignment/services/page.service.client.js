(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {_id: "321", name: "Post 1", title: "Page 1", websiteId: "456"},
            {_id: "432", name: "Post 2", title: "Page 2", websiteId: "456"},
            {_id: "543", name: "Post 3", title: "Page 3", websiteId: "456"},
            {_id: "654", name: "Post 1", title: "Page 4", websiteId: "567"},
            {_id: "765", name: "Post 2", title: "Page 5", websiteId: "567"},
            {_id: "876", name: "Post 3", title: "Page 6", websiteId: "567"}

        ]

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage

        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);


        }

        function findPageByWebsiteId(websiteId) {
            var allPages = [];
            for (var p in pages) {
                var page = pages[p];
                if (parseInt(page.websiteId) === parseInt(websiteId)) {
                    allPages.push(page);
                }
            }
            return allPages;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                var page = pages[p];
                if (parseInt(page._id) === pageId) {
                    return page;
                }
            }
            return null;
        }

        function updatePage(pageId, newPage) {
            for (var p in pages) {
                var currentPage = pages[p];
                if (parseInt(currentPage._id) === pageId) {
                    pages[p] = newPage;
                }
            }
        }

        function deletePage(pageId) {
            for (var p in pages) {
                var page = pages[p];
                if (parseInt(page._id) === parseInt(pageId)) {
                    pages.splice(parseInt(p), 1);
                }
            }
        }

    }
})();