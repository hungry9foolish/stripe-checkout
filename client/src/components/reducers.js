import {
    GET_PRODUCTS_PENDING, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
    ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, REMOVE_ALL_PRODUCTS_FROM_CART, UPDATE_PRICE_PRODUCT_QUANTITY_IN_CART, TOGGLE_CART_OPEN, CLOSE_CART,
    CREATE_STRIPE_CHECKOUT_SESSION_FAILURE, CREATE_STRIPE_CHECKOUT_SESSION_SUCCESS, CREATE_STRIPE_CHECKOUT_SESSION_LOADING, STRIPE_CHECKOUT_SESSION_CLEANUP
} from "./actions";

const initialProducts = {
    data: [],
    loading: false,
}
export const productReducer = (state = initialProducts, action) => {
    const { type, data } = action;
    switch (type) {
        case GET_PRODUCTS_PENDING:
            return { data: [], loading: true };
        case GET_PRODUCTS_SUCCESS:
            return { data: data, loading: false };
        case GET_PRODUCTS_FAILURE:
            return { data: [], loading: false };
        default:
            return state;
    }
}


const initialCartData = { cartOpen: false, cartData: [] }

export const cartReducer = (state = initialCartData, action) => {
    const { type, productId, priceId, quantity } = action;
    const { cartOpen, cartData } = state;
    switch (type) {
        case ADD_PRODUCT_TO_CART:
            if(!cartData.find(x => (x.productId === productId)))
                return { cartOpen, cartData: [...cartData, { productId: productId, priceId: priceId, quantity: 1 }] };
            else
                return state;
        case REMOVE_PRODUCT_FROM_CART:
            const indexOfItem = state.cartData.findIndex(item => item.productId === productId);
            if(indexOfItem > -1) {
                const newCart = [...state.cartData];
                newCart.splice(indexOfItem, 1);
                
                return {cartOpen: newCart.length>0 && cartOpen, cartData: newCart}
            }            
            return state;
        case UPDATE_PRICE_PRODUCT_QUANTITY_IN_CART:
            const oldItemIndex = state.cartData.findIndex(item => item.productId === productId);
            if(oldItemIndex >= 0) {
                const updatedQuantity = parseInt(quantity);
                const updatedCart = [...state.cartData];
                const updatedItem = {...updatedCart[oldItemIndex], quantity: !isNaN(updatedQuantity) ? updatedQuantity : 0};
                updatedCart.splice(oldItemIndex, 1, updatedItem);
                return {cartOpen, cartData: updatedCart};
            }
            return state;
        case REMOVE_ALL_PRODUCTS_FROM_CART:
            return { cartOpen: false, cartData: [] };
        case TOGGLE_CART_OPEN:
            return { cartOpen: !cartOpen, cartData }
        case CLOSE_CART:
            return { cartOpen: false, cartData};
        default:
            return state;
    }
}

export const initialStripeSessionData = {
    loading: false,
    sessionId: null,
    errorMessage: null,
}

export const stripeSession = (state= initialStripeSessionData, action) => {
    const {type, sessionId, errorMessage} = action;
    switch (type) {
        case CREATE_STRIPE_CHECKOUT_SESSION_LOADING:
            return { loading: true, sessionId: null, errorMessage: null};
        case CREATE_STRIPE_CHECKOUT_SESSION_SUCCESS:
            return { loading: false, sessionId, errorMessage: null};
        case CREATE_STRIPE_CHECKOUT_SESSION_FAILURE:
            return {loading: false, sessionId: null, errorMessage: errorMessage};
        case STRIPE_CHECKOUT_SESSION_CLEANUP:
            return {loading: false, sessionId: null, errorMessage: null}
        default:
            return state;
    }
}