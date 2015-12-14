var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();
mongoose.connect('mongodb://localhost/reactDB');

var dataPath = {
    LIST: '/data/users.json'
};

// create a schema
var userSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    desc: {type: String}
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

//var newUser = new User({
//    name: 'Vaibhavi',
//    email: 'BRomero@et.io',
//    id: '2222',
//    desc: 'lacus lacus lacus dolor. Need more details.'
//});

//newUser.save(function (err) {
//    if (err) throw err;
//
//    console.log('User sreaved successfully!');
//});

// get all the users
var users = {
    // read collection from MongoDB
    getAll: function () {
        return (
            User
                .find({}, function (err, users) {
                    if (err) next(err);
                    // object of all the users
                    //callback(users);
                    return users;
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
    //var jsonData = users.getAllFromJSON(__dirname + dataPath.LIST, 'utf-8');
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
app.get('/api/list/:user_id', function (req, res) {
    //var jsonData = users.getAllFromJSON(__dirname + dataPath.LIST, 'utf-8');
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