const Transaction = require('../models/mongooseTransaction');
const isHex = require('is-hex')
const isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

/**
 * Retrieve the transactions of a specified wallet, which can be the both sender and recipient
 * Route /transactions/:wallet
 * --URL PARAMS--
 * @param {*} wallet 
 * @type SHA256 public key in hexadecimal
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsByWallet = function(req, res) {
    let wallet = req.params.wallet;

    if (isHex(wallet)) {
        Transaction.find({ $or: [{ sender: req.params.wallet }, { recipient: req.params.wallet }] })
            .then((data) => {
                res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    } else {
        res.status(400).send('The given wallet is not a valid Hexadecimal number, making it an invalid parameter');
    }
};

/**
 * Retrieve the transactions of a specified recipient
 * /transactions/to/:wallet
 * --URL PARAMS--
 * @param {*} wallet 
 * @type SHA256 public key in hexadecimal
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsByRecipient = function(req, res) {
    let wallet = req.params.wallet;

    if (isHex(wallet)) {
        Transaction.find().where('recipient').equals(req.params.wallet)
            .then((data) => {
                res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
            })
            .catch((e) => {
                s
                res.status(400).send(e);
            });
    } else {
        res.status(400).send('The given wallet is not a valid Hexadecimal number, making it an invalid parameter');
    }
};

/**
 * Retrieve the transactions of a specified sender
 * /transactions/from/:wallet
 * --URL PARAMS--
 * @param {*} wallet 
 * @type SHA256 public key in hexadecimal
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsBySender = function(req, res) {
    let wallet = req.params.wallet;

    if (isHex(wallet)) {
        Transaction.find().where('sender').equals(req.params.wallet).then((data) => {
                res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    } else {
        res.status(400).send('The given wallet is not a valid Hexadecimal number, making it an invalid parameter');
    }
};

/**
 * Retrieve the transactions from a specified sender to a specified recipient
 * /transactions/from/:sender/to/:recipient
 * --URL PARAMS--
 * @param {*} sender 
 * @type SHA256 public key in hexadecimal
 * @param {*} recipient
 * @type SHA256 public key in hexadecimal 
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsFromTo = function(req, res) {
    let sender = req.params.sender;
    let recipient = req.params.recipient;
    if (isHex(sender) && isHex(recipient)) {
        Transaction.find({ sender: req.params.sender, recipient: req.params.recipient }).then((data) => {
                res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    } else {
        res.status(400).send('Both sender and recipient have to be a Hexadecimal format');
    }
};

/**
 * return transactions matching the specified period, firstdate and seconddate 
 * /transactions/period/:firstdate/:seconddate
 * --URL PARAMS--
 * @param {*} firstdate
 * @type Date as integer
 * @param {*} seconddate 
 * @type Date as integer
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsByPeriod = function(req, res) {
    let firstdate = req.params.firstdate;
    let seconddate = req.params.seconddate;
    if (isDate(firstdate) && isDate(seconddate)) {
        let first;
        let last;
        if (todate < from) {
            first = seconddate;
            last = firstdate;
        } else {
            first = firstdate;
            last = seconddate;
        }
        Transaction.find({ 'timestamp': { $gt: first, $lt: last } }).then((data) => {
                res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    } else {
        res.status(400).send('One of the given integer values does not represent a valid date');
    }
};

/**
 * return transactions matching the specified date 
 * /transactions/date/:date
 * --URL PARAMS--
 * @param {*} date 
 * @type Date as integer
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsByDate = function(req, res) {
    if (isDate(req.params.date)) {
        Transaction.find().where('timestamp').equals(req.params.date).then((data) => {
                res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    } else {
        res.status(400).send('The given integer value does not represent a valid date');
    }
};

/**
 * return transactions matching the specified amount range, low and high
 * /transactions/amount/:low/:high 
 * /transactions/amount/:low
 * --URL PARAMS--
 * @param {*} low 
 * @type Amount as integer > 0
 * @param {*} high 
 * @type Amount as integer > 0, > low
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionsByAmount = function(req, res) {

    if (req.params.high !== undefined) {
        if (!!isNaN(req.params.low) && !!isNaN(req.params.high)) {
            Transaction.find({ 'amount': { $gt: req.params.low, $lt: req.params.high } }).then((data) => {
                    res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
                })
                .catch((e) => {
                    res.status(400).send(e);
                });
        } else {
            res.status(400).send('One of the given parameters is not a number');
        }

    } else {
        if (!!isNaN(req.params.low)) {
            Transaction.find({ 'amount': { $gt: req.params.low } }).then((data) => {
                    res.status(200).send(JSON.stringify({ "transactions": data }, undefined, 2))
                })
                .catch((e) => {
                    res.status(400).send(e);
                });
        } else {
            res.status(400).send('The given parameter is not a number');
        }
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