var mongoose = require('mongoose');
var BlockHeaderSchema = new mongoose.Schema({
    hash: String,
    previoushash: String,
    validator: String,
    timestamp: String,
    reward: String,
    version: String
});
mongoose.model('BlockHeader', BlockHeaderSchema);
module.exports = mongoose.model('Blockheader');