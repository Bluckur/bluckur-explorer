const Block = require('../models/mongooseBlock');
const isHex = require('is-hex')
const isDate = function(date) {
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
    }
    /* TODO: Catch undefined errors on missing parameters*/

/**
 * Retrieve a specific block identified by the id
 * /block/bynumber/:number
 * --URL PARAMS--
 * @param {*} number 
 * @type Number of the block corresponding with its index in the chain
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getBlockByNumber = function(req, res) {
    if (!isNaN(req.params.number)) {
        Block.findOne({}, { _id: 0, __v: 0 }).where('header.blockNumber').equals(req.params.number).then((data) => {
                res.status(200).send(JSON.stringify({ "block": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    } else {
        res.status(400).send('The given parameter is not a number, the index of a block can only be a number');
    }
};

/**
 * Return all block validated by the given wallet
 * /blocks/wallet/:wallet
 * --URL PARAMS--
 * @param {*} wallet 
 * @type SHA256 public key in hexadecimal
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getBlocksByWallet = function(req, res) {
    if (isHex(req.params.wallet)) {
        Block.find({ "header": { $ne: null } }, { 'header': 1, _id: 0 }).where('header.validator').equals(req.params.wallet).then((data) => {
                res.status(200).send(JSON.stringify({ "blocks": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    } else {
        res.status(400).send('The given parameter is not a valid Hexadecimal value');
    }
};

/**
 * Returns the block of which the hash corresponds with the given hash
 * /block/byhash/:hash
 * --URL PARAMS--
 * @param {*} hash 
 * @type String
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getBlockByHash = function(req, res) {
    if (isHex(req.params.hash)) {
        Block.findOne({}, { _id: 0, __v: 0 }).where('header.blockHash').equals(req.params.hash).then((data) => {
                res.status(200).send(JSON.stringify({ "block": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    } else {
        res.status(400).send('The given parameter is not a valid Hexadecimal value');
    }
};

/**
 * /blocks/date/:date
 * --URL PARAMS--
 * @param {*} date
 * @type Date as integer
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getBlocksByDate = function(req, res) {
    Block.find({ "header": { $ne: null } }, { 'header': 1, _id: 0 }).where('header.timeStamp').equals(req.params.date).then((data) => {
            res.status(200).send(JSON.stringify({ "blocks": data }, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

/**
 * Return all block validated in the given period, which is between the first and second date
 * /blocks/period/:fromdate/:todate
 * --URL PARAMS--
 * @param {*} firstdate
 * @type Date as integer
 * @param {*} seconddate 
 * @type Date as integer
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getBlocksByPeriod = function(req, res) {
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
        Block.find({ "header": { $ne: null }, 'header.timeStamp': { $gt: first, $lt: last } }, { 'header': 1, _id: 0 }).then((data) => {
                res.status(200).send(JSON.stringify({ "blocks": data }, undefined, 2))
            })
            .catch((e) => {
                res.status(400).send(e);
            });

    } else {
        res.status(400).send('One of the given integer values does not represent a valid date');
    }
};

/**
 * Returns the first block validated after the block corresponding with the given hash
 * /block/next/:hash
 * --URL PARAMS--
 * @param {*} hash 
 * @type String
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getNextBlock = function(req, res) {
    if (isHex(req.params.hash)) {
        Block.findOne().where('header.blockHash').equals(req.params.hash).then((data) => {
            console.log(data);
            Block.findOne({}, { _id: 0, __v: 0 }).where('header.blockNumber').equals(data.header.blockNumber + 1).then((data) => {
                    res.status(200).send(JSON.stringify({ "block": data }, undefined, 2))
                })
                .catch((e) => {
                    res.status(400).send(e);
                });
        });
    } else {
        res.status(400).send('The given block hash value is not a valid Hexadecimal');
    }
};

/**
 * Returns all blocks validated after the block corresponding with the given hash
 * /blocks/next/:hash
 * --URL PARAMS--
 * @param {*} hash 
 * @type String
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getNextBlocks = function(req, res) {
    if (isHex(req.params.hash)) {
        Block.findOne({ "header": { $ne: null } }, { 'header': 1, _id: 0 }).where('header.blockHash').equals(req.params.hash).then((data) => {
            Block.find({ 'header.blockNumber': { $gte: data.header.blockNumber } }).then((data) => {
                    res.status(200).send(JSON.stringify({ "blocks": data }, undefined, 2))
                })
                .catch((e) => {
                    res.status(400).send(e);
                });
        });
    } else {
        res.status(400).send('The given block hash value is not a valid Hexadecimal');
    }
};

/**
 * Returns the block which was validated before the block corresponding with the given hash
 * /block/previous/:hash
 * --URL PARAMS--
 * @param {*} hash 
 * @type String
 * --METHOD PARAMS--
 * @param {*} req 
 * @param {*} res 
 */
const getPreviousBlock = function(req, res) {
    if (isHex(req.params.hash)) {
        Block.findOne({}, { _id: 0, __v: 0 }).where('header.blockHash').equals(req.params.hash).then((data) => {
            Block.find().where('header.blockNumber').equals(data.header.blockNumber - 1).then((data) => {
                    res.status(200).send(JSON.stringify({ "block": data }, undefined, 2))
                })
                .catch((e) => {
                    res.status(400).send(e);
                });
        });
    } else {
        res.status(400).send('The given block hash value is not a valid Hexadecimal');
    }
};

/**
 * Retrieve all blocks of the chain
 * @param {*} req 
 * @param {*} res 
 */
const getBlocks = function(req, res) {
    Block.find({ "header": { $ne: null } }, { 'header': 1, _id: 0 }).then((data) => {
            res.status(200).send(JSON.stringify({ "blocks": data }, undefined, 2))
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
    getBlockByNumber,
    getBlocksByPeriod,
    getBlocksByDate,
    getBlockByHash,
    getBlocksByWallet,
    getPreviousBlock,
    getNextBlock,
    getNextBlocks,
    getBlocks,
    addBlock
}