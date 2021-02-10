import React from "react"
import { Icon, IconGroup } from "semantic-ui-react";
import { connect } from "react-redux";
import { getProductsFromCart, toggleCartOpen } from "../actions";


const CartLauncher = ({ contextRef, productCount, toggleCartOpen }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleClick = () => {
        scrollToTop();
        toggleCartOpen();
    }

    if (productCount > 0) {
        return (
            <IconGroup circular inverted size="large" onClick={() => handleClick()}>
                <Icon inverted name="cart" />
                <Icon corner="top right" name="circle" color="red"><span style={{ paddingLeft: "2px" }}>{productCount}</span></Icon>
            </IconGroup>
        )
    }
    else {
        return <div />
    }
}

const mapStateToProps = (state) => {
    const productsInCart = getProductsFromCart(state);
    return {
        productCount: (productsInCart && productsInCart.length) || 0,
    }
}

export default connect(mapStateToProps, { toggleCartOpen })(CartLauncher);