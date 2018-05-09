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
    getBlocks,
    addBlock
}