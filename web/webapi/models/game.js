var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    tournament: {
        id: String
    },
    homeTeam: {
        id: String,
        goals: Number
    },
    awayTeam: {
        id: String,
        goals: Number
    },
    played: Date
});

module.exports = mongoose.model('Game', GameSchema, 'games');