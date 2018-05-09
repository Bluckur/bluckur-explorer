var mongoose = require('mongoose');
var transactionjson = require('./transactionjson')

var TransactionSchema = new mongoose.Schema(transactionjson);
mongoose.model('Transaction', TransactionSchema);
module.exports = mongoose.model('Transaction');