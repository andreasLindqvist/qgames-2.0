var express = require('express');
var Game = require('../models/game');
var Team = require('../models/team');

var router = express.Router();

router.route('/')
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
router.route('/:game_id')
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

router.route('/bytournament/:tournament_id')
	.get(function (req, res) {
	    console.log('get games');
	    Game.find({ 'tournament.id': req.params.tournament_id }).sort({ played: -1 }).exec(function (err, games) {
	        if (err)
	            res.send(err);

	        res.json(games);
	    });
	});

router.route('/:game_id/details')
    .get(function (req, res) {
        console.log('get game details');
        console.log('id: ' + req.params.game_id);
        //var game = {}, homeTeam = {}, awayTeam = {};
        var homeTeam = { id: '', name: '', goals: 0 }, awayTeam = { id: '', name: '', goals: 0 };
        Game.findById(req.params.game_id).exec()
        .then(function (game) {
            console.log('1');
            console.log(game.homeTeam.id);
            homeTeam.id = game.homeTeam.id;
            homeTeam.goals = game.homeTeam.goals;
            awayTeam.id = game.awayTeam.id;
            awayTeam.goals = game.awayTeam.goals;
            //res.json({ game: game });
            return Team.findById(game.homeTeam.id).exec();
        })
        .then(function (team) {
            console.log('2');
            console.log(team);
            homeTeam.name = team.name;
            return Team.findById(awayTeam.id).exec();

        }).then(function (team) {
            console.log('3');
            console.log(team);
            awayTeam.name = team.name;
            var details = homeTeam.name + ' - ' + awayTeam.name + ': ' + homeTeam.goals + '-' + awayTeam.goals;
            res.json({ details: details });
        });
        /*Game.findById(req.params.game_id).exec(function (err, result) {
            if (err)
                res.send(err);
            game = result;
            console.log(game.homeTeam.id);
            Team.where('_id').in([mongoose.Types.ObjectId(game.homeTeam.id), mongoose.Types.ObjectId(game.awayTeam.id)]).exec(function (err, result) {
                var t1 = result[0];
                res.json({ teams: [t1] });
            });
        });*/
    });

module.exports = router;