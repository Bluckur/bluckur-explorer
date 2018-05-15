require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');

/**
 * Initiate connection with the mongoose db server
 */
mongoose.connect('mongodb://ua23im3yvznz9lq:T91CXbcgV2NEE34Jimv1@bysrbdz7h9y84cy-mongodb.services.clever-cloud.com:27017/bysrbdz7h9y84cy');

/**
 * Enable reading the body of an api-request
 */
app.use(bodyParser.json());

/**
 * Set the routing
 */
app.use('/api', routes);

/**
 * listen to incoming requests
 */
app.listen(port);

console.log('Blucker-Explorer RESTful API server started on: ' + port);