import { combineReducers } from "redux";
import { productReducer as products, cartReducer as cart, stripeSession } from "./components/reducers";

export default combineReducers({
    products,
    cart,
    stripeSession
});