var mongoose = require('mongoose');
//var BlockHeader = require('./blockheader');
//var Transaction = require('./transaction');
var BlockSchema = new mongoose.Schema({
    transactions: [{}],
    blockheader: {
        hash: String,
        previoushash: String,
        validator: String,
        timestamp: String,
        reward: String,
        version: String
    },
});
mongoose.model('Block', BlockSchema);
module.exports = mongoose.model('Block');