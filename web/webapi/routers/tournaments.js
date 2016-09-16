var express = require('express');
var Tournament = require('../models/tournament');
var Team = require('../models/team');
var Game = require('../models/game');

var router = express.Router();

router.route('/')
	.get(function (req, res) {
	    console.log('get tournaments');
	    Tournament.find().exec(function (err, tournaments) {
	        if (err)
	            res.send(err);

	        res.json(tournaments);
	    });
	})
    .post(function (req, res) {
        // -------------- 
    });
router.route('/:tournament_id')
    .get(function (req, res) {
        console.log('get tournament');
        console.log('id: ' + req.params.tournament_id);
        Tournament.findById(req.params.tournament_id).exec(function (err, tournament) {
            if (err)
                res.send(err);
            res.json(tournament);
        });
    })
    .put(function (req, res) {
        Tournament.findById(req.params.player_id, function (err, tournament) {
            // ---------------------
        });
    })
    .delete(function (req, res) {
        Tournament.remove({
            _id: req.params.player_id
        }, function (err, tournament) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted', tournament: tournament });
        });
    });

router.route('/:tournament_id/details')
    .get(function (req, res) {
        var tournamentDetails = { name: '', teams: [], games: [] };
        var tournamentDetailsNumTeams = 0;
        var tournamentDetailsNumGames = 0;
        console.log('get tournament details');
        console.log('id: ' + req.params.tournament_id);
        Tournament.findById(req.params.tournament_id).exec()
        .then(function (tournament) {
            tournamentDetails.name = tournament.name;
            var teams = tournament.teams;
            tournamentDetailsNumTeams = teams.length;
            for (var i = 0; i < tournamentDetailsNumTeams; i++) {
                var team = teams[i];
                var teamId = team.id;
                getTeam(teamId);
            }
        });

        var getTeam = function (id) {
            Team.findById(id).exec(function (err, team) {
                if (err)
                    res.send(err);
                getTeamDone(team);
            });
        };
        var getTeamDone = function (team) {
            tournamentDetails.teams.push(team);
            checkAllTeamsDone();
        }
        var checkAllTeamsDone = function () {
            if (tournamentDetails.teams.length == tournamentDetailsNumTeams) {
                Game.find({ 'tournament.id': req.params.tournament_id }).sort({date: -1}).exec()
                .then(function (games) {
                    tournamentDetails.games = games;
                    checkAllGamesDone();
                });
            }
        }

        var checkAllGamesDone = function () {
            res.json(tournamentDetails);
            /*
            if (tournamentDetails.games.length == tournamentDetailsNumGames) {
                res.json(tournamentDetails);
            }*/
        }
    });



module.exports = router;