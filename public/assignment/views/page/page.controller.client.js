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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();
    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.addPage = addPage;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
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
                    }
                    ;
                PageService.createPage(vm.websiteId, page);

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
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
                PageService.updatePage(vm.pageId, page);

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


    }

})();