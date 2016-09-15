var path404 = '/public/404.html';

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://admin:datasn1lle@ds019654.mlab.com:19654/thgames', { authMechanism: 'ScramSHA1' });
console.log('mongo state: ' + mongoose.connection.readyState);
mongoose.connection.on('error', function (err) {
    console.log('mongo error');
    console.log(err);
});

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var webApiRouter = express.Router();
webApiRouter.get('/', function (req, res) {
    res.send('Välkommen till WebApi:et.\r\nJust det');
});

app.use('/webapi', webApiRouter);

var playerRouter = require('./webapi/routers/players');
var teamRouter = require('./webapi/routers/teams');
var gameRouter = require('./webapi/routers/games');
var tournamentRouter = require('./webapi/routers/tournaments');

app.use('/webapi/players', playerRouter);
app.use('/webapi/teams', teamRouter);
app.use('/webapi/games', gameRouter);
app.use('/webapi/tournaments', tournamentRouter);

app.get('/', function (req, res) {
    res.send('Hej värld');
});

app.get('/tournament', function (req, res) {
    res.send('Hej värld 2');
});


app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + path404);
});

app.listen(3000, function () {
    console.log('nu lyssnar vi på 3000');
});