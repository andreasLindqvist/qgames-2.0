var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TournamentSchema = new Schema({
    name: String,
    teams: [
        {
            id: String
        }
    ]
});

module.exports = mongoose.model('Tournament', TournamentSchema, 'tournaments');