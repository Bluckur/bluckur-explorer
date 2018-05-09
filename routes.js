var express = require('express');
var blockController = require('./controllers/blockcontroller');
//var chainController = require('./controllers/chaincontroller');
var transactionController = require('./controllers/transactioncontroller');

var router = express.Router();

/**
 * Routing of transaction requests
 */
router.route('/transactions/:sender').get(transactionController.getTransaction);
router.route('/transaction/:id').get(transactionController.getTransactionById);
router.route('/transactions').get(transactionController.getAllTransactions);
router.route('/transaction').post(transactionController.addTransaction);

/**
 * Routing of block requests
 */
router.route('/block/:id').get(blockController.getBlockById);
router.route('/blocks').get(blockController.getBlocks);
router.route('/block').post(blockController.addBlock);

/**
 * Routing of block requests
 */
//TODO
// router.route('/chain').get(chainController.getChain);
// router.route('/subchain').get(chainController.getSubChain);

module.exports = router;