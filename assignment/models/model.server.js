module.exports = function () {
    var mongoose = require('mongoose');
    var connectionString = 'mongodb://localhost/wam-fall-2016';
    mongoose.connect(connectionString);

    var UserModel = require("./user/user.model.server.js")();
    var WebsiteModel = require("./website/website.model.server.js")();
    var PageModel = require("./page/page.model.server.js")();
    var WidgetModel = require("./widget/widget.model.server.js")();

    var model = {
        UserModel: UserModel,
        WebsiteModel: WebsiteModel,
        PageModel: PageModel,
        WidgetModel: WidgetModel
    };

    WebsiteModel.setModel(model);
    UserModel.setModel(model);
    return model;
};