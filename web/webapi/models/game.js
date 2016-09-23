var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    tournament: {
        id: String
    },
    homeTeam: {
        id: String,
        goals: Number,
        name: String,
        logo: String
    },
    awayTeam: {
        id: String,
        goals: Number,
        name: String,
        logo: String
    },
    played: Date
});

module.exports = mongoose.model('Game', GameSchema, 'games');