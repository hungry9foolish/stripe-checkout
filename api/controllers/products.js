const Stripe = require('stripe');
console.log(process.env.STRIPE_SECRET || "evironment variable for stripe secret not defined");
const stripe = Stripe(process.env.STRIPE_SECRET);


getProducts = async (req, res) => {
    const products = await stripe.products.list();
    res.send(products);
}

module.exports = getProducts;