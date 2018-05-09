var mongoose = require('mongoose');
var blockheaderjson = require('./blockheaderjson');
var BlockHeaderSchema = new mongoose.Schema(blockheaderjson);
mongoose.model('BlockHeader', BlockHeaderSchema);
module.exports = mongoose.model('Blockheader');