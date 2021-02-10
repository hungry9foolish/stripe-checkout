import axios from "axios";
import _ from "lodash";
import { ProductGrid } from "./productGrid";

export const GET_PRODUCTS_PENDING = "get_products_pending";
export const GET_PRODUCTS_SUCCESS = "get_products_success";
export const GET_PRODUCTS_FAILURE = "get_products_failure";

export const getProductsWithPrices = () => {
    return function (dispatch) {
        axios.get("/api/prices")
            .then((response) => {
                const prices = response.data?.data || [];
                const pricesByProduct = _.groupBy(prices, (price) => price.product.id);
                const productsWithPrices = Object.keys(pricesByProduct).map(productId => {
                    const currentProduct = pricesByProduct[productId][0]?.product || {};
                    const prices = pricesByProduct[productId].map(pr => {
                        const { product, ...price } = pr;
                        return price;
                    });
                    return { ...currentProduct, prices: prices };
                });
                const sortedProductList = productsWithPrices.sort((a, b) => (a.name > b.name) ? 1 : -1);
                return dispatch({ type: GET_PRODUCTS_SUCCESS, data: sortedProductList })
                //setProducts(productsWithPrices.sort((a, b) => (a.name > b.name) ? 1 : -1));
                //console.log(productsWithPrices);
                //setLoading(false);
            })
            .catch((err) => {
                return dispatch({ type: GET_PRODUCTS_FAILURE });
            });
            return dispatch({ type: GET_PRODUCTS_PENDING });
    }
} 

export const selectProductById = (state, productId) =>
  state.products.data.find(product => product.id === productId)

export const ADD_PRODUCT_TO_CART = "add_product_to_cart";
export const REMOVE_PRODUCT_FROM_CART = "remove_product_from_cart";
export const REMOVE_ALL_PRODUCTS_FROM_CART = "remove_all_products_from_cart";
export const UPDATE_PRICE_PRODUCT_QUANTITY_IN_CART = "update_product_quantity_in_cart";

export const addProductToCart = (productId, priceId) => {
    return {
        type: ADD_PRODUCT_TO_CART,
        productId,
        priceId
    }
}

export const removeProductFromCart = (productId) => {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        productId,
    }
}

export const clearCart = () => {
    return {
        type: REMOVE_ALL_PRODUCTS_FROM_CART
    }
}

export const updateProductQuantityInCart = (productId, quantity) => {
    return {
        type: UPDATE_PRICE_PRODUCT_QUANTITY_IN_CART,
        productId,
        quantity
    }
}

export const getProductFromCart = (state, productId) => 
    state.cart.cartData.find(cartItem => cartItem.productId === productId)

export const getProductsFromCart = (state) =>
    state.cart.cartData;


export const TOGGLE_CART_OPEN = "toggle_cart_open";
export const CLOSE_CART = "close_cart";

export const toggleCartOpen = () => {
    return {
        type: TOGGLE_CART_OPEN
    }
}

export const closeCart = () => {
    return {
        type: CLOSE_CART
    }
}


export const CREATE_STRIPE_CHECKOUT_SESSION_IDLE = "create_stripe_cheokout_session_idle";
export const CREATE_STRIPE_CHECKOUT_SESSION_LOADING = "create_stripe_cheokout_session_loading";
export const CREATE_STRIPE_CHECKOUT_SESSION_SUCCESS = "create_stripe_cheokout_session_success";
export const CREATE_STRIPE_CHECKOUT_SESSION_FAILURE = "create_stripe_cheokout_session_failure";
export const STRIPE_CHECKOUT_SESSION_CLEANUP = "stripe_checkout_session_cleanup";

export const createStripeCheckoutSession = (cartItemsWithQtyAndPrices) => {
    return function (dispatch) {
        axios.post("/api/stripe/session", {cartItemsWithQtyAndPrices, hostURL: window.location.href})
        .then((res) => {
            const {sessionId} = res.data;
            return dispatch({type: CREATE_STRIPE_CHECKOUT_SESSION_SUCCESS, sessionId}) 
        })
        .catch(err => {
            return dispatch({type: CREATE_STRIPE_CHECKOUT_SESSION_FAILURE, errorMessage: err.message || "Something went wrong"})
        });
        return dispatch({type: CREATE_STRIPE_CHECKOUT_SESSION_LOADING});
    }
}

export const cleanupStripeSession = () => ({
    type: STRIPE_CHECKOUT_SESSION_CLEANUP
});

export const stripeCheckoutFailed = (errorMessage) => {
    return {type: CREATE_STRIPE_CHECKOUT_SESSION_FAILURE, errorMessage};
}