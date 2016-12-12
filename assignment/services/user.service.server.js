var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app,model) {

    var userModel = model.userModel;

    app.get("/auth/facebook", passport.authenticate('facebook', { scope : 'email' }));
    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/assignment/#/user/',
        failureRedirect: '/assignment/#/login'
    }));

    app.post("/api/login", passport.authenticate('local'), login);
    //app.post("/api/login", login);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', unregisterUser);
    app.get("/api/loggedin", loggedin);
    app.post("/api/register", register);
    app.post("/api/logout", logout);


    passport.use('local', new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function facebookLogin(token, refreshToken, profile, done) {
        console.log(profile);
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            firstname: profile.displayName.split( )[0],
                            lastname: profile.displayName.split( )[1],
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );
    }


    function localStrategy(username, password, done) {
        console.log("ls");
        console.log(username);
        userModel
            .findUserByUsername(username)
            .then(
                    function(user){
                        if (user !== null) {
                            if (user && bcrypt.compareSync(password, user.password)) {
                                console.log("ls t");
                                //if(user && password === user.password) {
                                return done(null, user);
                            } else {
                                return done(null, false);
                            }
                        } else {

                            return done(null, false);
                        }
                    },
                    function(err) {
                        //if (err) { return done(err); }
                        res.send('0');
                    }
            );
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()){
            res.json(req.foundUser);
        } else {
            res.send(false);
        }
    }

    function login(req, res) {
        var user = req.user;
        console.log("User object");
        console.log(user.username)
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

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
        console.log("Userr");
        console.log(username)
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

    function register(req, res){
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then( function (newUser) {
                    if(newUser){
                        res.status(400).send("Username already exists");
                        return;
                    } else {
                        password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser({username: username, password: password});
                    }
                }, function (err) {
                    res.status(400).send(err);
                }
            ).then(function(user) {
                if (user) {
                    req.login(user, function (err) {
                        if(err){
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }

};