module.exports = function(app,model) {

    var userModel = model.userModel;

    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', unregisterUser);

    function unregisterUser(req, res) {
        var uid = req.params.uid;
        userModel
            .findUserById(uid)
            .then(
                function(existingUser){
                    if (existingUser !== null) {
                        userModel
                            .deleteUser(uid);
                    }
                    else {
                        res.status(500).send("User not found")
                    }},
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function updateUserOld(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        userModel
            .findUserById(uid)
            .then(
                function(existingUser){
                    if (existingUser !== null) {
                        userModel
                            .updateUser(uid, user);
                    }
                    else {
                        res.status(500).send("Null user object. Should not be here")
                    }},
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function updateUser(req, res) {
        var id = req.params.uid;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function createUser(req, res){
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function(existingUser) {
                    if (existingUser !== null) {
                        res.status(400).send("Username already exists");
                    } else {
                        userModel
                            .createUser(user)
                            .then(
                                function (newUser) {
                                    res.json(newUser);
                                },
                                function (error) {
                                    res.statusCode(400).send("Not able to create user");
                                });
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username,password)
            .then(
                function(existingUser){
                    if (existingUser !== null) {
                        res.json(existingUser)
                    }
                    else {
                        res.status(500).send("User not found")
                    }},
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        userModel
            .findUserByUsername(username, res)
            .then(
                function (user) {
                    res.json(user);
                },
                function(err) {
                    res.status(404).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        userModel
            .findUserById(userId, res)
            .then(
                function (user) {
                    res.json(user);
                },
                function(err) {
                    res.status(404).send(err);
                });
    }
};