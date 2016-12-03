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
            console.log("In register controller " + username)
            if (username) {
                if (password === password2) {
                    UserService
                        .createUser(username, password)
                        .success(function (user) {
                            $location.url("/user/" + user._id);
                        })
                        .error(function (error) {
                            vm.error = error;
                        });
                } else {
                    vm.error("Password and Verify Password fields don't match")
                }
            } else {
                vm.error = "Username cannot be blank";
            }
        }
    }

    function loginController(UserService, $location,$rootScope) {
        var vm = this;
        vm.login = login;

        function login(username,password) {
            console.log("In login controller "+ username);

            if(username === null || password == null) {
                //vm.error = "Please enter both username and password";
                return;
            }
            UserService
                .login(username, password)
                .success(function(user) {
                    console.log(user.data);
                if(user === '0') {
                    vm.error = "No such user";
                } else {
                    $rootScope.currentUser = user;
                    $location.url("/user/" + user._id);
                    console.log("/user/" + user._id)
                }
            })
                .error(function(err){
                    console.log("In .error")
                    console.log(err);
                });
        }
    }

    function profileController($routeParams,UserService, $location,$rootScope) {
        var vm = this;
        userId = $routeParams["uid"];
        //var userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        vm.logout = logout;
        vm.userId = $rootScope.currentUser._id;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    console.log(userId)
                    console.log(user)
                    if(user !== 0) {
                        vm.user = user;
                    }
                })
                .error(function (err) {
                    console.log("Couldnt find user. In ProfileController");
                })
        }
        function updateUser(user) {
            if (user.email) {
                console.log("Update user "+user.firstName)
                UserService.updateUser(userId, user);
                console.log("In updateUser controller " + userId)
                $location.url("/user/" + userId);
            } else {
                vm.error = "Email cant be empty.";
            }
        }

        function deleteUser() {
            console.log("In controller "+ userId);
            var status;
            UserService.deleteUser(userId)
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function() {
                        $location.url("/login");
                    }
                )
        }
        init();
    }
})();
