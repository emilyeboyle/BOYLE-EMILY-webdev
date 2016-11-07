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
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function (websites) {
                    vm.websites = websites;
                });
        }

        init();

    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.addWebsite = addWebsite;
        function init() {
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise
                .success(function (websites) {
                    vm.websites = websites;
                });
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
                WebsiteService
                    .createWebsite(userId, website)
                    .success(function () {
                        $location.url("/user/" + userId + "/website");
                    });
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
            var promise = WebsiteServce.findWebsitesByUser(vm.userId);
            promise
                .success(function (websites) {
                    vm.websites = websites;
                });
            var promise2 = WebsiteService.findWebsiteById(websiteId);
            promise2
                .success(function (website) {
                    vm.website = website;
                });
        }

        init();

        function editWebsite(siteName, description) {
            if (siteName === undefined && description === undefined) {
                vm.error = "Fields cannot be left blank"
            } else {
                if (siteName === undefined) {
                    siteName = vm.website.name;
                } else if (description === undefined) {
                    description = vm.website.description;
                }

                var website = {
                    _id: vm.website._id,
                    name: siteName,
                    description: description,
                    developerId: vm.userId
                };
                WebsiteService
                    .updateWebsite(websiteId, website)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website");
                    });


            }
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.website)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                });

        }


    }

})();