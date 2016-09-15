var express = require('express');
var Player = require('../models/player');

var router = express.Router();

router.route('/')
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
router.route('/:player_id')
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

            res.json({ message: 'Successfully deleted', player: player });
        });
    });

module.exports = router;