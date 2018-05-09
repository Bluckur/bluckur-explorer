var mongoose = require('mongoose');
var TransactionSchema = new mongoose.Schema({
    recipient: String,
    amount: String,
    type: String,
    timestamp: String
});
mongoose.model('Transaction', TransactionSchema);
module.exports = mongoose.model('Transaction');