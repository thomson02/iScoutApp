/**
 * Module dependencies.
 */
var util = require('util');

var express = require('express')
    , api = require('./api')
    , http = require('http')
    , path = require('path')
    , models = require("./models")
    , mongoose = require('mongoose');

// Setup the Mongo db connection
// =============================
var db = mongoose.createConnection(process.env.MONGOLAB_URI);
models.configureSchema(mongoose.Schema, mongoose);

// Configure the App
// =================
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('@tt3ndanc3'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'app')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

// Setup the Routes
// ================
app.get('/', function(req, res) {
    var userAgent = req.headers['user-agent'];
    if(!req.user) {
        return res.sendfile('./app/splash.html');
    }

    return res.sendfile('./app/index.html');
});

//api.configureRoutes(app, graph, ObjectType, UniqueObject, User);

// Setup the server
// ================
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});