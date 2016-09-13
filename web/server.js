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

var Team = require('./webapi/models/team');

app.use(express.static(__dirname + '/public'));

var webApiRouter = express.Router();
webApiRouter.get('/', function (req, res) {
    res.json({ message: 'This is the QGames API' });
});
webApiRouter.route('/teams')
	.get(function (req, res) {
	    console.log('get teams');
	    Team.find().exec(function (err, teams) {
	        if (err)
	            res.send(err);

	        res.json(teams);
	    });
	})
    .post(function (req, res) {
        /*var page = new Team();
        page.headline = req.body.headline;
        page.description = req.body.description;
        var currentDate = new Date();
        page.publishDate = currentDate;
        page.modifiedDate = currentDate;
        page.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Page created!', page: page });
        });
        */
    });
webApiRouter.route('/teams/:team_id')
    .get(function (req, res) {
        console.log('get team');
        console.log('id: ' + req.params.team_id);
        Team.findById(req.params.team_id).exec(function (err, team) {
            if (err)
                res.send(err);
            res.json(team);
        });
    })
    .put(function (req, res) {
        Team.findById(req.params.team_id, function (err, team) {
            /*if (err)
                res.send(err);
            if (req.body.headline)
                page.headline = req.body.headline;
            if (req.body.description)
                page.description = req.body.description;
            var currentDate = new Date();
            page.modifiedDate = currentDate;
            page.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Page updated!', page: page });
            });
            */
        });
    })
    .delete(function (req, res) {
        Team.remove({
            _id: req.params.team_id
        }, function (err, team) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted', team: team});
        });
    });
app.use('/webapi', webApiRouter);

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