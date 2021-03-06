(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        // var widgets = [
        //     {_id: "123", widgetType: "HEADER", pageId: "654", size: 2, text: "GIZMODO"},
        //     {_id: "234", widgetType: "HEADER", pageId: "654", size: 4, text: "Lorem ipsum"},
        //     {_id: "345", widgetType: "IMAGE", pageId: "654", width: "100%", url: "http://lorempixel.com/400/200/"},
        //     {_id: "456", widgetType: "HTML", pageId: "654", text: "<p>Lorem ipsum</p>"},
        //     {_id: "567", widgetType: "HEADER", pageId: "654", size: 4, text: "Lorem ipsum"},
        //     {_id: "678", widgetType: "YOUTUBE", pageId: "654", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E"},
        //     {_id: "789", widgetType: "HTML", pageId: "654", text: "<p>Lorem ipsum</p>"}
        //
        // ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget

        };
        return api;

        function createWidget(pageId, widget) {
            $http.post("/api/page/" + pageId + "/widget", widget);
            // widget.pageId = pageId;
            // widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
            // var allWidgets = [];
            // for (var w in widgets) {
            //     var widg = widgets[w];
            //     if (parseInt(widg.pageId) === parseInt(pageId)) {
            //         allWidgets.push(widg);
            //     }
            // }
            // return allWidgets;
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
            // for (var w in widgets) {
            //     var widg = widgets[w];
            //     if (widg._id === widgetId) {
            //         return widg;
            //     }
            // }
            // return null;
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            $http.put(url, widget);
            // for (var w in widgets) {
            //     var oldWidget = wigets[w];
            //     if (oldWidget._id === widgetId) {
            //         oldWidget = widget;
            //     }
            // }
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
            // for (var w in widgets) {
            //     var widg = widgets[w];
            //     if (widg._id === widgetId) {
            //         widgets.splice(w, 1);
            //     }
            // }
        }

    }
})();