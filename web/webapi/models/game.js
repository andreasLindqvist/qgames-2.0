var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    tournament: {
        id: String
    },
    homeTeam: {
        id: String,
        goalsScored: Number,
        goalsAgainst: Number
    },
    awayTeam: {
        id: String,
        goalsScored: Number,
        goalsAgainst: Number
    }
});

module.exports = mongoose.model('Game', GameSchema, 'games');