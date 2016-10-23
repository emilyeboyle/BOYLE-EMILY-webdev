(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.addWebsite = addWebsite;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }


        init();

        function addWebsite(siteName, description) {
            if (siteName === undefined || description === undefined) {
                vm.error = "Fields cannot be left blank"
            } else {
                var website = {
                    _id: Date.now(),
                    name: siteName,
                    description: description,
                    developerId: vm.userId
                };
                WebsiteService.createWebsite(vm.userId, website);

                $location.url("/user/" + vm.userId + "/website");
            }
        }

    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams.wid);
        vm.edit = editWebsite;
        vm.delete = deleteWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }

        init();
        function editWebsite(siteName, description) {
            var currentWebsite = WebsiteService.findWebsiteById(websiteId);
            if (siteName === undefined && description === undefined) {
                vm.error = "Fields cannot be left blank"
            } else {
                if (siteName === undefined) {
                    siteName = currentWebsite.name;
                } else if (description === undefined) {
                    description = currentWebsite.description;
                }

                var website = {
                    _id: currentWebsite._id,
                    name: siteName,
                    description: description,
                    developerId: vm.userId
                };
                WebsiteService.updateWebsite(websiteId, website);

                $location.url("/user/" + vm.userId + "/website");
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.website);
            $location.url("/user/" + vm.userId + "/website");
        }


    }

})();