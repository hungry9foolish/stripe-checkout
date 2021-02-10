import React, { useState } from "react";
import { connect } from "react-redux";
import { Sidebar, Segment, Button, Label, Icon, Message } from "semantic-ui-react";
import { getProductsFromCart, selectProductById, removeProductFromCart, clearCart, closeCart, updateProductQuantityInCart } from "../actions";
import ProductDetails from "../product/productDetails";
import StripeCheckoutButton from "../stripe/stripeCheckout";

const ErrorMessage = ({ text }) => {
    const [visible, setVisible] = useState(true);
    const handleClick = () => {
        setVisible(false);
    };
    if(visible) {
        return (
            <p>
                <Icon name="exclamation circle" color="red" />
                <span style={{ color: "red" }}>{text}</span>
                <span style={{float: "right"}}>
                    <Icon name="close" color="red" onClick={handleClick} />
                </span>
            </p>
        )
    }
    return null;
};

export const CartSidebar = ({ productsInCart, cartOpen, removeProductFromCart, clearCart, closeCart, updateProductQuantityInCart, errorMessage }) => (
    <Sidebar
        as={Segment}
        animation="slide along"
        direction="right"
        icon='labeled'
        vertical
        visible={productsInCart.length > 0 && cartOpen}
        width='wide'
        basic
    >
        <Label as='a' color='blue' size="mini" onClick={() => closeCart()} style={{ float: "right" }}>
            CLOSE CART
            <Label.Detail><Icon name="close" /></Label.Detail>
        </Label>
        <br />
        {productsInCart.map(product => {
            const { name, description, quantity, images, id, prices } = product;
            const imageSrc = images[0];
            const priceArray = prices.map(price => {
                const { unit_amount, currency, id, transform_quantity, inCart } = price;
                const divide_by = transform_quantity?.divide_by;
                return {
                    id,
                    currency,
                    amount: unit_amount,
                    units: divide_by,
                    inCart
                }
            })
            return <ProductDetails key={id} id={id} description={description} imageSrc={imageSrc} quantity={quantity} prices={priceArray} removeFromCart={removeProductFromCart} updateProductQuantityInCart={updateProductQuantityInCart} />;
        })}
        {!!errorMessage && <ErrorMessage text={errorMessage} />}
        <center>        
            <Segment.Inline>
                <StripeCheckoutButton productsInCart={productsInCart} />
                <Button secondary onClick={() => clearCart()}>Clear Cart</Button>
            </Segment.Inline>

        </center>

    </Sidebar>
)

const mapStateToProps = (state) => {
    const productIdsInCart = getProductsFromCart(state);
    const { errorMessage } = state.stripeSession;
    const productsInCart = productIdsInCart.map(product => {
        const productObj = selectProductById(state, product.productId);
        productObj.quantity = product.quantity;
        if (productObj && Array.isArray(productObj.prices)) {
            productObj.prices.forEach(price => {
                if (price.id === product.priceId)
                    price.inCart = true;
            });
        }
        return productObj;
    });
    return {
        productsInCart,
        cartOpen: state.cart.cartOpen,
        errorMessage
    }
}

export default connect(mapStateToProps, { removeProductFromCart, clearCart, closeCart, updateProductQuantityInCart })(CartSidebar)