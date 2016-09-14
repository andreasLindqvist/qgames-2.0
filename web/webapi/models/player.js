var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    userName: String,
    playerName: String,
    image: String
});

module.exports = mongoose.model('Player', PlayerSchema, 'players');