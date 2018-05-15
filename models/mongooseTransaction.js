var mongoose = require('mongoose');
var blueprints = require('bluckur-models');

var TransactionSchema = new mongoose.Schema(blueprints.transactionBlueprint);

mongoose.model('Transaction', TransactionSchema);
module.exports = mongoose.model('Transaction');