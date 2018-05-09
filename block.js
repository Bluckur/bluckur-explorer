var mongoose = require('mongoose');
var BlockHeader = require('./blockheader');
var Transaction = require('./transaction');
var BlockSchema = new mongoose.Schema({
    transactions: Transaction[],
    header: BlockHeader,
});
mongoose.model('Block', BlockSchema);
module.exports = mongoose.model('Block');