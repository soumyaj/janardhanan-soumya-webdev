(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController)
        .controller("LoginController", loginController)
        .controller("ProfileController", profileController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(username,password,password2) {
            console.log("In register controller "+ username)

            var u = {_id: "123", username: username,    password: password,    firstName: "Alice",  lastName: "Wonder"  }
            var user = UserService.createUser();
            if(user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(username,password) {
            console.log("In login controller "+ username)
            if(user === null || password == null) {
                //vm.error = "Please enter both username and password";
                return;
            }

            var user = UserService.findUserByCredentials(username, password);
            if(user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function profileController($routeParams,UserService, $location) {
        var vm = this;
        userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            vm.user = UserService.findUserById(userId);
        }

        function updateUser(user) {
            if (user.name) {
                UserService.updateUser(vm.userId, user);
                $location.url("/user/" + vm.userId + "/user");
            } else {
                vm.error = "User name cant be empty!";
            }
        }

        function deleteUser() {
            console.log("In controller "+ vm.userId)
            var status;
            status = UserService.deleteUser(vm.userId)
            if(status === null) {
                vm.error = "Unable to delete website."
            }
        }
        init();
    }
})();
