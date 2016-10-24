(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];

        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser

        };
        return api;

        function createUser(user) {
            for(var u in users) {
                current_user = users[u];
                // Duplicate check
                if(user._id === current_user[_id]) {
                    return null;
                }
            }
            if(user!=null) {
                users.push(user)
            }
        }

        function findUserById(userId) {
            console.log("USER ID "+userId)
            for(var u in users) {
                curr_user = users[u];
                console.log(curr_user)
                if(parseInt(curr_user._id) === parseInt(userId)) {
                    return curr_user;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                user = users[u];
                if(user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            console.log("In findUserByCredentials "+ username)
            for(var u in users) {
                user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for(var u in users) {
                current_user = users[u];
                if(userId === parseInt(current_user._id)) {
                    current_user = user;
                    break;
                }
            }
        }

        function deleteUser(userId) {
            for(var u in users) {
                user = users[u];
                if(parseInt(user._id) === userId)
                    users.splice(u, 1);
                    break;
            }
        }

    }
})();