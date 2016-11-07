(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        // var users = [
        //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        // ];

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser

        };
        return api;

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
            // for (var u in users) {
            //     user = users[u];
            //     if (parseInt(user._id) === userId) {
            //         return user;
            //     }
            // }
            // return null;
        }

        function findUserByUsername(username) {
            var url = '/api/user?username=' + username;
            return $http.get(url);
            // for (var u in users) {
            //     user = users[u];
            //     if (user.username === username) {
            //         return user;
            //     }
            // }
            // return null;
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + '&password=' + password;
            return $http.get(url);
            // for (var u in users) {
            //     user = users[u];
            //     if (user.username === username && user.password === password) {
            //         return user;
            //     }
            // }
            // return null;
        }

        function updateUser(user) {
            var url = "/api/user/" + user._id;
            $http.put(url, user);
            // for (var u in users) {
            //     var oldUser = users[u];
            //     if (user._id === userId) {
            //         user = oldUser;
            //         return user;
            //     }
            // }
            // return null;
        }

        function deleteUser(user) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
            // for (var u in users) {
            //     var currentUser = users[u];
            //     if (currentUser._id === user.userId) {
            //         users.splice(u, 1);
            //     }
            // }
        }
    }
})();