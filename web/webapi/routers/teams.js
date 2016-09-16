var express = require('express');
var Team = require('../models/team');

var router = express.Router();

router.route('/')
	.get(function (req, res) {
	    console.log('get teams');
	    Team.find().exec(function (err, teams) {
	        if (err)
	            res.send(err);

	        res.json(teams);
	    });
	})
    .post(function (req, res) {
        var team = new Team();
        if (!req.body.name || !req.body.playerId) {
            res.status(400);
            res.send('Lag måste ha namn!');
            return;
        }
        team.name = req.body.name;
        team.playerId = req.body.playerId;
        team.logo = req.body.logo;
        team.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Team created!', team: team });
        });
        
    });

router.route('/:team_id')
    .get(function (req, res) {
        console.log('get team');
        console.log('id: ' + req.params.team_id);
        Team.findById(req.params.team_id).exec(function (err, team) {
            if (err)
                res.send(err);
            res.json(team);
        });
    })
    .patch(function (req, res) {
        Team.findById(req.params.team_id, function (err, team) {
            if (err) {
                res.status(404);
                res.send('Team not found. error: ' + err);
                return;
            }
            if (req.body.name)
                team.name = req.body.name;
            if (req.body.playerId)
                team.playerId = req.body.playerId;
            if (req.body.logo)
                team.logo = req.body.logo;
            team.save(function (err) {
                if (err) {
                    res.status(500);
                    res.send(err);
                    return;
                }
                res.json({ message: 'Team updated!', team: team });
            });
        });
    })
    .delete(function (req, res) {
        Team.remove({
            _id: req.params.team_id
        }, function (err, team) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted', team: team });
        });
    });

router.route('/byplayer/:player_id')
 .get(function (req, res) {
     console.log('get teams by player');
     console.log('id: ' + req.params.player_id);
     Team.find({ playerId: req.params.player_id }).exec(function (err, teams) {
         if (err)
             res.send(err);
         res.json(teams);
     });
 });

module.exports = router;