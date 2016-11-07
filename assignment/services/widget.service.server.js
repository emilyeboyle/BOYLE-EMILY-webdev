module.exports = function (app) {

    var widgets = [
        {_id: "123", widgetType: "HEADER", pageId: "654", size: 2, text: "GIZMODO"},
        {_id: "234", widgetType: "HEADER", pageId: "654", size: 4, text: "Lorem ipsum"},
        {_id: "345", widgetType: "IMAGE", pageId: "654", width: "100%", url: "http://lorempixel.com/400/200/"},
        {_id: "456", widgetType: "HTML", pageId: "654", text: "<p>Lorem ipsum</p>"},
        {_id: "567", widgetType: "HEADER", pageId: "654", size: 4, text: "Lorem ipsum"},
        {_id: "678", widgetType: "YOUTUBE", pageId: "654", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E"},
        {_id: "789", widgetType: "HTML", pageId: "654", text: "<p>Lorem ipsum</p>"}

    ];

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

    function createWidget(req, res) {
        var widget = req.body;
        widget._id = (new Date()).getTime();
        widgets.push(widget);
        res.send(page);
    }

    function findAllWidgetsForPage(req, res) {
        var wid = parseInt(req.params.widgetId)
        var result = [];
        for (var w in widgets) {
            if (widgets[w]._id === wid) {
                result.push(widgets[w]);
            }
        }
        res.json(result);
    }

    function findWidgetById(req, res) {
        var wid = parseInt(req.params.widgetId);
        for (var w in widgets) {
            if (widgets[w]._id === wid) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var wid = parseInt(req.params.widgetId);
        for (var w in widgets) {
            if (widgets[w]._id === wid) {
                widgets[w] = widget;
            }
        }
        res.send(200);
    }

    function deleteWidget(req, res) {
        var wid = parseInt(req.params.widgetId);
        for (var w in widgets) {
            if (widgets[w]._id === wid) {
                widgets.splice(parseInt(w), 1);
            }
        }
        res.send(200);
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;


        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;
    }

};