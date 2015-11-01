module.exports = function(app) {
    var users = [
        {first: "Alice", last: "Wonderland", username: 'alice', email: 'alice@wonderland.com'},
        {first: "Bob", last: "Marley", username: 'bob', email: 'bob@wonderland.com'},
        {first: "Charlie", last: "Garcia", username: 'charlie', email: 'charlie@wonderland.com'},
        {first: "Dan", last: "Craig", username: 'dan', email: 'dan@wonderland.com'}
    ];

    app.get('/api/user', function(req, res){
        res.json(users);
    });
    app.get('/api/user/:id', function(req, res){
        var index = req.params.id;
        res.json(users[index]);
    });
    app.delete('/api/user/:id', function(req, res){
        var index = req.params.id;
        users.splice(index, 1);
        res.json(users);
    });
    app.post('/api/user', function(req, res){
        var user = req.body;
        users.push(user);
        res.json(users);
    });
    app.put('/api/user/:id', function(req, res){
        var index = req.params.id;
        var user = req.body;
        users[index].first = user.first;
        users[index].last = user.last;
        res.json(users);
    });
};
