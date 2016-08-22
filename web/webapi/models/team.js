var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String,
    logo: String,
    wins: Number,
    losses: Number,
    draws: Number
});

module.exports = mongoose.model('Team', TeamSchema, 'teams');