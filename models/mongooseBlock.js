var mongoose = require('mongoose');
var blueprints = require('bluckur-models');
var BlockSchema = new mongoose.Schema(blueprints.blockBlueprint);
mongoose.model('Block', BlockSchema);
module.exports = mongoose.model('Block');