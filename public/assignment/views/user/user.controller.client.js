(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController)
        .controller("LoginController", loginController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(username,password,verify_password) {
            console.log("In login controller "+ username)
            var user = UserService.findUserByCredentials(username, password);
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
            var user = UserService.findUserByCredentials(username, password);
            if(user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }
})();
