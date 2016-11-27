(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            updateUser: updateUser,
            unregisterUser: unregisterUser
        };
        return api;

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