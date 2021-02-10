const express = require('express');
const getProducts = require('./controllers/products');
const getPrices = require('./controllers/prices');
const healthCheck = require('./controllers/healthCheck');
const createSession = require('./controllers/checkout');

const router = express.Router();
router.get('/healthCheck', (req, res)=>healthCheck(req, res));
router.get('/products', (req, res)=>getProducts(req, res));
router.get('/prices', (req, res) => getPrices(req, res));
router.get('/prices/:productID', (req, res) => getPrices(req, res));
router.post('/stripe/session', (req, res)=> createSession(req, res));


module.exports = router;