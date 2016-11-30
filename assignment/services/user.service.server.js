module.exports = function (app, model) {

    var UserModel = model.UserModel;

    // var users = [
    //     {username: 'alice', password: 'ewq', _id: 123, first: 'Alice', last: 'Wonderland'},
    //     {username: 'bob', password: 'ewq', _id: 234, first: 'Bob', last: 'Dylan'},
    //     {username: 'charlie', password: 'ewq', _id: 345, first: 'Charlie', last: 'Brown'}
    // ];

    app.post('/api/user', createUser);
    // app.post("/api/register", register);
    app.post("/api/login", login);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    function login(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user) {
                        // res.status(400).send("Username already exists");
                        return res.json(user);
                    } else {
                        return UserModel.createUser(req.body);
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function createUser(req, res) {
        var newUser = req.body;
        // user._id = (new Date()).getTime();
        // users.push(user);
        // res.send(user);
        UserModel
            .createUser(newUser)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )

    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        UserModel
            .deleteUser(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove user");
                }
            );

        // for (var u in users) {
        //     if (users[u]._id === uid) {
        //         users.splice(parseInt(u), 1);
        //     }
        // }
        // res.send(200);
    }

    function updateUser(req, res) {
        var newUser = req.body;
        var id = req.body._id;

        UserModel
            .updateUser(id, newUser)
            .then(
                function (user) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update user");
                }
            );

        // for (var u in users) {
        //     if (users[u]._id === uid) {
        //         users[u] = user;
        //     }
        // }
        // res.send(200);
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        UserModel
            .findUserByCredentials(username, password)
            .then(
                function (users) {
                    if (users) {
                        res.json(users[0]);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        // for (var u in users) {
        //     if (users[u].username === username &&
        //         users[u].password === password) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send('0');
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(404).send("Unable to find user");
                }
            );

        // for (var u in users) {
        //     if (users[u].username === username) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send('0');
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        // for (var u in users) {
        //     if (users[u]._id === userId) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send('0');
        UserModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }
};