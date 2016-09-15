var express = require('express');
var Tournament = require('../models/tournament');

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

module.exports = router;