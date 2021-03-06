(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //     {_id: "123", name: "Facebook", description: "This is Facebook", developerId: "456"},
        //     {_id: "234", name: "Tweeter", description: "This is Tweeter", developerId: "456"},
        //     {_id: "456", name: "Gizmodo", description: "This is Gizmodo", developerId: "456"},
        //     {_id: "567", name: "Tic Tac Toe", description: "This is Tic Tac Toe", developerId: "123"},
        //     {_id: "678", name: "Checkers", description: "This is Checkers", developerId: "123"},
        //     {_id: "789", name: "Chess", description: "This is Chess", developerId: "234"}
        // ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite

        };
        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/" + userId + "/website", website);
            // website.developerId = userId;
            // websites.push(website);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
            // var userSites = [];
            // for (var w in websites) {
            //     var site = websites[w];
            //     if (parseInt(site.developerId) === userId) {
            //         userSites.push(site);
            //     }
            // }
            // return userSites;
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
            // var url = "/api/user/" + userId + "/website";
            // return $http.get(url);
            // for (var w in websites) {
            //     var site = websites[w];
            //     if (parseInt(site._id) === websiteId) {
            //         return site;
            //     }
            // }
            // return null;
        }

        function updateWebsite(websiteId, newWebsite) {
            var url = "/api/website/" + websiteId;
            $http.put(url, newWebsite);
            // for (var w in websites) {
            //     var site = websites[w];
            //     if (parseInt(site._id) === websiteId) {
            //         websites[w] = newWebsite;
            //     }
            // }
        }

        function deleteWebsite(website) {
            var url = "/api/website/" + website._id;
            return $http.delete(url);
            // for (var w in websites) {
            //     var site = websites[w];
            //     if (parseInt(site._id) === parseInt(website._id)) {
            //         websites.splice(parseInt(w), 1);
            //     }
            // }
        }

    }

})();