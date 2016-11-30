(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                });
        }

        init();
    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.addPage = addPage;
        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                });
        }

        init();

        function addPage(pageName, pageTitle) {
            if (pageName === undefined || pageTitle === undefined) {
                vm.error = "Fields cannot be left blank"
            } else {
                var page = {
                    _id: Date.now(),
                    name: pageName,
                    title: pageTitle,
                    websiteId: vm.websiteId
                };
                PageService
                    .createPage(vm.websiteId, page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    });
            }
        }

    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.edit = editPage;
        vm.delete = deletePage;

        function init() {
            var promise = PageService
                .findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                });
            var promise2 = PagesService.findPageById(vm.pageId);
            promise2
                .success(function (page) {
                    vm.page = page;
                });
        }

        init();

        function editPage(pageName, title) {
            var currentPage = PageService.findPageById(vm.pageId);
            if (pageName === undefined && title === undefined) {
                vm.error = "Fields cannot be left blank"
            } else {
                if (pageName === undefined) {
                    pageName = currentPage.name;
                } else if (title === undefined) {
                    title = currentPage.description;
                }

                var page = {
                        _id: currentPage._id,
                        name: pageName,
                        title: title,
                        websiteId: vm.websiteId
                    }
                    ;
                PageService
                    .updatePage(vm.pageId, page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website");
                    });

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });

        }


    }

})();