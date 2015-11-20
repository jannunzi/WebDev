module.exports = function(app, UserModel, passport)
{
    app.get("/api/experiments/passport/user/:id", function(req, res)
    {
        isUserAdmin(req.user.username, function(user)
        {
            if(user != '0' || req.user._id == req.params.id)
            {
                UserModel.findById(req.params.id, function(err, user)
                {
                    res.send(user);
                });
            }
        });
    });

    app.delete("/api/experiments/passport/user/:id", function(req, res)
    {
        isUserAdmin(req.user.username, function(user)
        {
            if(user != '0')
            {
                UserModel.remove({_id : req.params.id}, function(err, count)
                {
                    res.send(count);
                });
            }
        });
    });

    app.get("/api/experiments/passport/user", function(req, res)
    {
        isUserAdmin(req.user.username, function(user)
        {
            if(user != '0')
            {
                UserModel.find(function(err, users)
                {
                    res.json(users);
                });
            }
        });
    });

    app.post("/api/experiments/passport/user", function(req, res)
    {
        var user = req.body
        if(user.roles)
        {
            user.roles = user.roles.split(",");
        }
        else
        {
            user.roles = ["student"];
        }
        UserModel.findOne({username: user.username}, function(err, existingUser)
        {
            if(existingUser != null)
            {
                res.json(null);
                return;
            }
            else
            {
                UserModel.create(user, function(err, result)
                {
                    res.json(result);
                });
            }
        });
    });

    app.post("/api/experiments/passport/login", passport.authenticate('local'), function(req, res)
    {
        var user = req.body;
        UserModel.findOne({username: user.username, password: user.password}, function(err, foundUser)
        {
            res.json(foundUser);
        });
    });

    app.put("/api/experiments/passport/update", function(req, res)
    {
        UserModel.findById(req.body._id, function(err, foundUser)
        {
            var user = req.body;
            if(user.roles.indexOf(",") > 0)
            {
                user.roles = user.roles.split(",");
            }
            foundUser.update(req.body, function(err, count)
            {
                res.send(count);
            });
        });
    });

    app.get('/api/experiments/passport/loggedin', function(req, res)
    {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/api/experiments/passport/logout', function(req, res)
    {
        req.logOut();
        res.send(200);
    });

    app.get('/api/experiments/passport/admin', function(req, res)
    {
        if(req.isAuthenticated())
        {
            UserModel.findOne({username: req.user.username}, function(err, foundUser)
            {
                if(foundUser.roles.indexOf('admin') > -1)
                {
                    res.json(foundUser);
                }
                else
                {
                    res.send('0');
                }
            });
        }
        else
        {
            res.send('0');
        }
    });

    function isUserAdmin(username, callback)
    {
        UserModel.findOne({username: username}, function(err, foundUser)
        {
            if(foundUser.roles.indexOf('admin') > -1)
            {
                callback(foundUser);
            }
            else
            {
                callback('0');
            }
        });
    }

}