var mongoose = require('mongoose');
var blueprints = require('bluckur-models');
var BlockHeaderSchema = new mongoose.Schema(blueprints.blockHeaderBlueprint);
mongoose.model('BlockHeader', BlockHeaderSchema);
module.exports = mongoose.model('Blockheader');