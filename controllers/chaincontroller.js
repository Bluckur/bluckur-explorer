const Chain = require('../models/chain');

const getChain = function(req, res) {
    Chain.find().then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
};

module.exports = {
    getChain
}