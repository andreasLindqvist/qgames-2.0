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

/* --- Teams --- */
var Team = require('./webapi/models/team');
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

/* --- Players --- */
var Player = require('./webapi/models/player');
webApiRouter.route('/players')
	.get(function (req, res) {
	    console.log('get players');
	    Player.find().exec(function (err, players) {
	        if (err)
	            res.send(err);

	        res.json(players);
	    });
	})
    .post(function (req, res) {
       // -------------- 
    });
webApiRouter.route('/players/:player_id')
    .get(function (req, res) {
        console.log('get player');
        console.log('id: ' + req.params.player_id);
        Player.findById(req.params.player_id).exec(function (err, player) {
            if (err)
                res.send(err);
            res.json(player);
        });
    })
    .put(function (req, res) {
        Player.findById(req.params.player_id, function (err, player) {
            // ---------------------
        });
    })
    .delete(function (req, res) {
        Player.remove({
            _id: req.params.player_id
        }, function (err, team) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted', player: player});
        });
    });

/* --- Games --- */
var Game = require('./webapi/models/game');
webApiRouter.route('/games')
	.get(function (req, res) {
	    console.log('get games');
	    Game.find().exec(function (err, games) {
	        if (err)
	            res.send(err);

	        res.json(games);
	    });
	})
    .post(function (req, res) {
        // -------------- 
    });
webApiRouter.route('/games/:game_id')
    .get(function (req, res) {
        console.log('get game');
        console.log('id: ' + req.params.game_id);
        Game.findById(req.params.game_id).exec(function (err, game) {
            if (err)
                res.send(err);
            res.json(game);
        });
    })
    .put(function (req, res) {
        Game.findById(req.params.game_id, function (err, game) {
            // ---------------------
        });
    })
    .delete(function (req, res) {
        Game.remove({
            _id: req.params.game_id
        }, function (err, game) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted', game: game });
        });
    });
webApiRouter.route('/gamedetails/:game_id')
    .get(function (req, res) {
        console.log('get game details');
        console.log('id: ' + req.params.game_id);
        var game = {}, homeTeam = {}, awayTeam = {};
        Game.findById(req.params.game_id).exec(function (err, result) {
            if (err)
                res.send(err);
            game = result;
            console.log(game.homeTeam.id);
            Team.where('_id').in([mongoose.Types.ObjectId(game.homeTeam.id), mongoose.Types.ObjectId(game.awayTeam.id)]).exec(function (err, result) {
                var t1 = result[0];
                res.json({ teams: [t1] });
            });
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