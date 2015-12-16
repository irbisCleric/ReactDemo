var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();
mongoose.connect('mongodb://localhost/reactDB');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var dataPath = {
    LIST: '/data/users.json'
};

var User = require('./models/user');

// get all the users
var users = {
    // read collection from MongoDB
    getAll: function () {
        return (
            User
                .find({}, function (err, users) {
                    if (err) next(err);

                    return users; // object of all the users
                })
        );
    },
    // read sync
    getAllFromJSON: function (filepath, encoding) {
        if (typeof (encoding) == 'undefined') {
            encoding = 'utf8';
        }
        var file = fs.readFileSync(filepath, encoding);
        return JSON.parse(file);
    }
};

// CORS on ExpressJS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * get users list
 */
app.get('/api/list', function (req, res) {
    users
        .getAll()
        .then(function (data) {
            res.contentType('application/json');
            res.send(data);
        });
});

/**
 * get single user
 */
app.get('/api/user/:user_id', function (req, res) {
    users
        .getAll()
        .then(function (data) {
            data.forEach(function (userObj) {
                if (userObj.id === req.params.user_id) {
                    res.contentType('application/json');
                    res.send(userObj);
                }
            });
        });
});

app.post('/api/user/create', function (req, res) {
    var user = new User();      // create a new instance of the User model

    user.name = req.body.name;
    user.email = req.body.email;
    user.id = Math.floor(Date.now() / 1000);

    // save the user and check for errors
    user.save(function (err) {
        if (err) res.send(err);
        res.json({message: 'User created!'});
    });
});



app.get('/', function (req, res) {
    res.send('Hello React server');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(1715, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});