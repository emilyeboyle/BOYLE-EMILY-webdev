module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var api = {
            createWebsiteForUser: createWebsiteForUser,
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            setModel: setModel

        }
        ;
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId, website) {
        website.userId = userId;
        return WebsiteModel
            .create(website)
            .then(function (websiteObj) {
                model.UserModel
                    .findUserById(userId)
                    .then(function (userObj) {
                            websiteObj._user = userObj._id;
                            websiteObj.save();
                            userObj.websites.push(websiteObj);
                            return userObj.save();
                        },
                        function (error) {
                            console.log(error);
                        });
            })
    }

    function findAllWebsitesForUser(userId) {
        return model.UserModel.findAllWebsitesForUser(userId);

    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findWebsiteById(websiteId);

    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update(
            {_id: websiteId},
            {
                $set: {
                    name: website.name,
                    description: website.description
                }
            }
        )

    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({_id: websiteId})

    }

};