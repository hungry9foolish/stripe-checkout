const Stripe = require('stripe');
const { error } = require('../../winston');
const winston = require('../../winston');
console.log(process.env.STRIPE_SECRET || "evironment variable for stripe secret not defined");
const stripe = Stripe(process.env.STRIPE_SECRET);


getPrices = async (req, res) => {
    const productID = req.params.productID;
    let prices = [];
    if(!productID) {
        prices = await getAllPrices();
    } else {
        prices = await getProductPrice(req, res, productID);
    }
    res.send(prices);
}

//@private
getProductPrice = async(req, res, productID) => {    
    if(!productID) {
        winston.error("Product ID missing in call to /prices/:productID");
        res.status(400);
        res.send({error: "Product ID missing in call to /prices/:productID"});
    }
    return await stripe.prices.list({
        product: productID,
        expand: ["data.product"]
    });
}

//@private
const getAllPrices = async (req, res) => {
    return await stripe.prices.list({
        expand: ["data.product"]
    });
}

module.exports = getPrices;