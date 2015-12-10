var express = require('express');
var fs = require('fs');

var app = express();

var dataPath = {
    LIST: '/data/users.json'
};

// CORS on ExpressJS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function readJsonFileSync(filepath, encoding) {

    if (typeof (encoding) == 'undefined') {
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

app.get('/api/list', function (req, res) {
    var jsonData = readJsonFileSync(__dirname + dataPath.LIST, 'utf-8');

    res.contentType('application/json');
    res.send(jsonData);
});

app.get('/api/list/:user_id', function (req, res) {
    var jsonData = readJsonFileSync(__dirname + dataPath.LIST, 'utf-8');

    jsonData.forEach(function (userObj) {
        if (userObj.user_id === Number(req.params.user_id)) {
            res.contentType('application/json');
            res.send(userObj);
        }
    });
});

app.get('/', function (req, res) {
    res.send('Hello React server');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
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

module.exports = app;