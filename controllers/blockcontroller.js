const Block = require('../models/block');

/**
 * Retrieve a specific block identified by the id
 * @param {*} req 
 * @param {*} res 
 */
const getBlockById = function(req, res) {
    Block.find().where('id').equals(req.params.id).then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
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
const getBlocksByWallet = function(req, res) {
    Block.find().where('header.validator').equals(req.params.wallet).then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
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
const getBlockByHash = function(req, res) {
    Block.find().where('header.blockHash').equals(req.params.hash).then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
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
const getBlockByDate = function(req, res) {
    Block.find().where('header.timeStamp').equals(Date.parse(req.params.date)).then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
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
const getBlocksByPeriod = function(req, res) {
    Block.find({ 'header.timeStamp': { $gt: req.params.fromdate, $lt: req.params.todate } }).then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
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
const getNextBlock = function(req, res) {
    Block.find().where('header.blockHash').equals(req.params.hash).then((data) => {
        Block.find().where('header.blockNumber').equals(data.header.blockNumber + 1).then((data) => {
                res.status(200).send(JSON.stringify(data, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getNextBlocks = function(req, res) {
    Block.find().where('header.blockHash').equals(req.params.hash).then((data) => {
        Block.find({ 'header.blockNumber': { $gte: data.header.blockNumber } }).then((data) => {
                res.status(200).send(JSON.stringify(data, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getPreviousBlock = function(req, res) {
    Block.find().where('header.blockHash').equals(req.params.hash).then((data) => {
        Block.find().where('header.blockNumber').equals(data.header.blockNumber - 1).then((data) => {
                res.status(200).send(JSON.stringify(data, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    });
};

/**
 * Retrieve all blocks of the chain
 * @param {*} req 
 * @param {*} res 
 */
const getBlocks = function(req, res) {
    Block.find().then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

/**
 * Add a block to the chain
 * @param {*} req 
 * @param {*} res 
 */
const addBlock = function(req, res) {
    let body = req.body;
    let block = new Block(body);
    block.save().then(() => {
            console.log("block: " + block + "\n is added");
            res.status(200).send("block: " + block);
        })
        .catch((e) => {
            res.send(400).send(e);
        });
}

module.exports = {
    getBlockById,
    getBlocksByPeriod,
    getBlockByDate,
    getBlocksByHash,
    getBlocksByWallet,
    getPreviousBlock,
    getNextBlock,
    getNextBlocks,
    getBlocks,
    addBlock
}