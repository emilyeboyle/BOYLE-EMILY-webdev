module.exports = function () {

    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;
    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, widget) {
        widget._page = pageId;
        WidgetModel.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({_page: pageId})
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findWidgetById(widgetId);

    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        return WidgetModel.update(
            {_id: widgetId},
            {
                $set: widget,
                name: widget.name,
                text: widget.text,
                placeholder: widget.placeholder,
                description: widget.description,
                url: widget.url,
                width: widget.width,
                height: widget.height,
                rows: widget.rows,
                size: widget.size,
                class: widget.class,
                icon: widget.icon,
                deletable: widget.deletable,
                formatted: widget.formatted
            }
        )
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove({_id: widgetId})
    }

    function reorderWidget(pageId, start, end) {

    }
};
