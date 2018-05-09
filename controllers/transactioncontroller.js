const Transaction = require('../models/transaction');
var TransactionSchema = require('../models/transactionjson');

/**
 * Retrieve the transaction of a specified sender
 * @param {*} req 
 * @param {*} res 
 */
const getTransaction = function(req, res) {
    Transaction.find().where('sender').equals(req.params.sender).then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

/**
 * Retrieve a specific transaction identified by the id
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionById = function(req, res) {
    Transaction.find().where('id').equals(req.params.id).then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

/**
 * Add a transaction
 * @param {*} req 
 * @param {*} res 
 */
const addTransaction = function(req, res) {
    let body = req.body;
    let transaction = new Transaction(body);
    transaction.save().then(() => {
            res.status(200).send();
        })
        .catch((e) => {
            res.send(400).send(e);
        });
}

/**
 * Retrieve all transactions
 * @param {*} req 
 * @param {*} res 
 */
const getAllTransactions = function(req, res) {
    Transaction.find().then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
}

module.exports = {
    getAllTransactions,
    getTransaction,
    getTransactionById,
    addTransaction
}