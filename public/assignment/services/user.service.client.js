(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            unregisterUser: unregisterUser,
            register: registerUser,
            createUser: createUser,
            login:login,
            logout:logout,
            loggedin: loggedin
        };
        return api;

        function login(username,password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login",user);
            console.log($http.post("/api/login",user))
        }

        function logout(){
            return $http.post("/api/logout");
        }

        function loggedin(){
            return $http.get("/api/loggedin");
        }


        function unregisterUser(uid) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
        }

        function updateUser(userId,user) {
            var url = "/api/user/" + userId;
            console.log("Update "+user.email)
            $http.put(url, user);
        }

        function createUser(username, password) {
            if(username == null || password == null)
            {
                return '0'
            }

            var user = {
                username: username,
                password: password,
                firstName: " ",
                lastName: " "
            };
            console.log(user)
            return $http.post("/api/user", user);
        }

        function registerUser(username,password) {
            if(username == null || password == null)
            {
                return '0'
            }

            var user = {
                username: username,
                password: password,
                firstName: " ",
                lastName: " "
            };
            console.log(user)
            return $http.post("/api/register", user);
        }

        function findUserById(userId) {
            console.log(userId)
            var url = "/api/user/"+userId;
            console.log(url)
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            console.log(url)
            return $http.get(url);
        }
    }
})();