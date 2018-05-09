var mongoose = require('mongoose');
var transactionjson = require('./transactionjson')
var blockheaderjson = require('./blockheaderjson')
    //var BlockHeader = require('./blockheader');
    //var Transaction = require('./transaction');
var BlockSchema = new mongoose.Schema({
    transactions: [transactionjson],
    blockheader: blockheaderjson
});
mongoose.model('Block', BlockSchema);
module.exports = mongoose.model('Block');