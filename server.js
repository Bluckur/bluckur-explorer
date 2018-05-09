require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Transaction = require('./transaction');
const app = express();
const port = process.env.PORT || 3000;
mongoose.connect('mongodb://ua23im3yvznz9lq:T91CXbcgV2NEE34Jimv1@bysrbdz7h9y84cy-mongodb.services.clever-cloud.com:27017/bysrbdz7h9y84cy');
app.use(bodyParser.json());

app.post('/transaction/add', (req, res) => {
    console.log("Post call received");
    console.log("mongodburl: " + process.env.MONGODB_URI);
    console.log(req.body);
    var body = req.body;
    var transaction = new Transaction(body);
    transaction.save().then(() => {
            res.status(200).send();
        })
        .catch((e) => {
            res.send(400).send(e);
        });
});

app.get('/transactions/data', (req, res) => {
    console.log("get call received");
    Transaction.find().then((data) => {
            res.status(200).send(JSON.stringify(data, undefined, 2))
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);