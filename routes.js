var express = require('express');
var blockController = require('./controllers/blockcontroller');
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
router.route('/block/bynumber/:number').get(blockController.getBlockByNumber);
router.route('/block/byhash/:hash').get(blockController.getBlockByHash);
router.route('/block/previous/:hash').get(blockController.getPreviousBlock);
router.route('/block/next/:hash').get(blockController.getNextBlock);
router.route('/blocks/next/:hash').get(blockController.getNextBlocks);
router.route('/blocks/wallet/:wallet').get(blockController.getBlocks);

router.route('/blocks/date/:date').get(blockController.getBlocksByDate);
router.route('/blocks/period/:fromdate/:todate').get(blockController.getBlocksByPeriod);

router.route('/blocks').get(blockController.getBlocks);
router.route('/block').post(blockController.addBlock);

/**
 * Routing of block requests
 */
//TODO
// router.route('/chain').get(chainController.getChain);
// router.route('/subchain').get(chainController.getSubChain);

module.exports = router;