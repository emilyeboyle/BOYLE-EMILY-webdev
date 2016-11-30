module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            setModel: setModel,
            findAllWebsitesForUser: findAllWebsitesForUser
        }
        ;
    return api;
    function setModel(_model) {
        model = _model;
    }


    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);

    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});

    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({username: username, password: password});

    }

    function updateUser(userId, user) {
        delete user._id;

        return UserModel.update(
            {_id: userId},
            {
                $set: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }

            }
        )


    }

    function deleteUser(userId) {
        return User.remove({_id: userId});

    }

    function findAllWebsitesForUser(userId) {
        return UserModel.findById(userId).populate("websites", "name").exec();
    }
};