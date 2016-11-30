(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function (user) {
                    if (user === '0') {
                        vm.error = "No such user";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (user) {
                    vm.error = "No such user";
                })
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, password2) {
            if (username === undefined || password === undefined || password2 === undefined) {
                vm.error = "Fields cannot be left blank"
            } else if (password !== password2) {
                vm.error = "Passwords must match"
            } else {
                var user = {
                    username: username,
                    password: password,
                    firstName: "first",
                    lastName: "last"
                };
                var promise = UserService.createUser(user);
                promise
                    .success(function (user) {
                        $location.url("/user/" + user._id);
                    })
                    .error(function (error) {

                    });

            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })

        }

        init();
        function updateUser() {
            UserService.updateUser(vm.user);
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.user._id)
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {

                });
        }
    }


})();