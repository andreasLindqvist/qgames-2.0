var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String,
    playerId: String,
    logo: String
});

module.exports = mongoose.model('Team', TeamSchema, 'teams');