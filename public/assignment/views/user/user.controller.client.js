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
            var user = UserService.findUserByCredentials(username, password);
            if (user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, password2) {
            if (username === undefined || password === undefined || password2 === undefined) {
                vm.error = "Fields cannot be left blank"
            } else if (password !== password2) {
                vm.error ="Passwords must match"
            } else {
                var user = {
                    _id: Date.now(),
                    username: username,
                    password: password,
                    firstName: "first",
                    lastName: "last"
                };
                UserService.createUser(user);
                $location.url("/user/" + user._id);
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = parseInt($routeParams.uid);
        var user = UserService.findUserById(vm.userId);

        if (user != null) {
            vm.user = user;
        }
    }

})();