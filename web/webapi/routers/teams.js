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

            res.json({ message: 'Successfully deleted', team: team });
        });
    });

module.exports = router;