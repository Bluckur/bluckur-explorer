const Transaction = require('../models/transaction');



/**
 * Retrieve the transactions of a specified wallet, which can be the both sender and recipient
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsByWallet = function(req, res) {
    Transaction.find({ $or: [{ sender: req.params.wallet }, { recipient: req.params.wallet }] }).then((data) => {
            res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

/**
 * Retrieve the transactions of a specified recipient
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsByRecipient = function(req, res) {
    Transaction.find().where('recipient').equals(req.params.wallet).then((data) => {
            res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

/**
 * Retrieve the transactions of a specified sender
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsBySender = function(req, res) {
    Transaction.find().where('sender').equals(req.params.wallet).then((data) => {
            res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
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
            res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

/**
 * Retrieve the transactions of a specified wallet, which can be the both sender and recipient
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsFromTo = function(req, res) {
    Transaction.find({ sender: req.params.sender, recipient: req.params.recipient }).then((data) => {
            res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsByPeriod = function(req, res) {
    Transaction.find({ 'timestamp': { $gt: req.params.fromdate, $lt: req.params.todate } }).then((data) => {
            res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsByDate = function(req, res) {
    Transaction.find().where('timestamp').equals(req.params.date).then((data) => {
            res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsByAmount = function(req, res) {
    if (req.params.high !== undefined) {
        Transaction.find({ 'amount': { $gt: req.params.low, $lt: req.params.high } }).then((data) => {
                res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    } else {
        Transaction.find({ 'amount': { $gt: req.params.low } }).then((data) => {
                res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    }
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
            console.log("transaction added: \n" + transaction);
            res.status(200).send("transaction: " + transaction);
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
            res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
}

module.exports = {
    getAllTransactions,
    getTransactionsByAmount,
    getTransactionsByDate,
    getTransactionsByPeriod,
    getTransactionsByRecipient,
    getTransactionsBySender,
    getTransactionsByWallet,
    getTransactionsFromTo,
    addTransaction
}