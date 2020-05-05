//npm install --save express body-parser morgan body-parser serve-favicon
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
// Handeling Server Requests 
app.post('/login', login.loginToVChat);
app.post('/register', login.registerToVChat);

// handeling socket 
//npm install --save socketio socket.io-client
var socket = require('./routes/socket');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
module.exports = app;
