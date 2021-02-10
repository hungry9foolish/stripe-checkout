import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import {createStripeCheckoutSession, cleanupStripeSession, stripeCheckoutFailed} from "../actions";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutButton = ({loading, sessionId, createStripeCheckoutSession, cleanupStripeSession, stripeCheckoutFailed, productsInCart}) => {

    const cartItemsWithQtyAndPrices = Array.isArray(productsInCart) ? productsInCart.map(product => {
        const {prices, quantity, id, metadata} = product;
        const price = prices.find(price => price.inCart) || prices[0];
        const customId = metadata && metadata.customId;
        return {price: price.id, quantity: quantity, productId: id, customId};
    }): [];

    const handleClick = () => {
        createStripeCheckoutSession(cartItemsWithQtyAndPrices);
    };

    useEffect(() => {
        const redirectIfSession = async () => {
            if(sessionId) {
                const stripe = await stripePromise;
                const response = await stripe.redirectToCheckout({
                    sessionId,
                });
                if(response.error) {
                    stripeCheckoutFailed(response.error);
                }
                cleanupStripeSession();
            }
        }
        redirectIfSession();

    }, [sessionId, cleanupStripeSession, stripeCheckoutFailed]);

    

    return (
        <Button primary role="link" onClick={handleClick} loading={loading}>
            Proceed to Checkout
        </Button>
    );
}

const mapStateToProps = (state) => {
    const {loading, sessionId} = state.stripeSession;
    return {
        loading,
        sessionId
    }
}

export default connect(mapStateToProps, {createStripeCheckoutSession,cleanupStripeSession, stripeCheckoutFailed})(StripeCheckoutButton);