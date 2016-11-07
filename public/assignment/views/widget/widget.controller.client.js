(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            var promise = WidgetService.findWidgetsByPageId(vm.pid);
            promise
                .success(function (widgets) {
                    vm.widgets = widgets;

                });
        }

        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];
        vm.addWidget = addWidget;
        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
        }

        init();

        function addWidget(widgetId, description) {
            if (widgetId === undefined || description === undefined) {
                vm.error = "Fields cannot be left blank"
            } else {
                var widget = {
                    _id: Date.now(),
                    // widgetType: siteName,
                    description: description,
                    websiteId: vm.wid
                };
                WidgetService
                    .createWidget(vm.pid, widget)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.wid + "/page/" + "pid" + "/widget");
                    })

            }
        }
    }

    function EditWidgetController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.editWidget = editWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            var promise = WidgetService.findWidgetById(vm.wgid);
            promise
                .success(function (widgets) {
                    vm.widget = widget;
                })
        }

        init();

        function editWidget(widgetName, description) {
            if (widgetName === undefined && description === undefined) {
                vm.error = "Fields cannot be left blank"
            } else {
                if (widgetName === undefined) {
                    widgetName = vm.widget.name;
                } else if (description === undefined) {
                    description = vm.widget.description;
                }

                var widget = {
                    _id: vm.widget._id,
                    name: widgetName,
                    description: description,
                    developerId: vm.userId
                };
                WidgetService
                    .updateWidget(vm.widget._id, widget)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.wid + "/page/" + "pid" + "/widget");
                    });
            }
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widget)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.wid + "/page/" + "pid" + "/widget");
                });

        }
    }

})();