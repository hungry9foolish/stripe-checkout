const Stripe = require('stripe');
const { error } = require('../../winston');
const winston = require('../../winston');
console.log(process.env.STRIPE_SECRET || "evironment variable for stripe secret not defined");
const stripe = Stripe(process.env.STRIPE_SECRET);


createSession = async (req, res) => {
    try{
        const {cartItemsWithQtyAndPrices, hostURL} = req.body;
        if(!Array.isArray(cartItemsWithQtyAndPrices) || cartItemsWithQtyAndPrices.length < 1) {
          winston.error(`Incorrect body param pricesWithQuantity: ${cartItemsWithQtyAndPrices}`);
          throw error("Incorrect body param cartItemsWithQtyAndPrices");
        }
        const productIds = cartItemsWithQtyAndPrices.map(x => x.customId || x.productId);
        const pricesWithQuantities = cartItemsWithQtyAndPrices.map(x => ({price: x.price, quantity: x.quantity}));
        const session = await stripe.checkout.sessions.create({
            success_url: `${hostURL}success`,
            cancel_url: `${hostURL}cancel`,
            payment_method_types: ['card'],
            line_items: pricesWithQuantities,
            mode: 'payment',
            payment_intent_data: {
              metadata: {
                productIds: JSON.stringify(productIds)
              }
            }
          });
          res.send({ sessionId: session.id });
    }
    catch(err) {
        res.status(500).send({error: true, ...err})
    }

      
}

module.exports = createSession;