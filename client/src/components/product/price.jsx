import React from "react";
import { Icon, IconGroup } from "semantic-ui-react";

const currencyIcon = {
    usd: "dollar",
    gbp: "pound",
    inr: "rupee",
    jpy: "yen",
    eur: "euro"
}


const AddPriceToCart = ({ displayCart }) => (
    <div style={{ float: "right" }}>
        { displayCart &&
            <IconGroup>
                <Icon link color='orange' name='opencart' />
                <Icon link corner='top right' name='add' color="green" />
            </IconGroup>
        }
    </div>
);

const PriceAlreadyInCart = ({ displayCart }) => {
    if (displayCart) {
        return (
            <div style={{ float: "right" }}>
                <span style={{ color: "#f2711c", fontSize: "xx-small" }}><i>ADDED TO CART</i></span>
            </div>);
    }
    else {
        return <div style={{ float: "right" }}><Icon size="small" name="certificate" inverted color="green" /></div>
    }
}

const Price = ({ id, units, currency, amount, displayCart, addToCart, inCart }) => {
    const iconName = currencyIcon[currency] || "money";
    const formattedAmountString = (amount / 100)?.toLocaleString("en-US");
    return (
        <div id={id} onClick={() => addToCart(id)}>
            <div style={{ float: "left" }}>
                <Icon link name={iconName} color="green" />
                <span>{formattedAmountString}</span>
                <span>{` per ${process.env.REACT_APP_PRODUCT_UNIT_TEXT || "unit"}`}</span>
            </div>
            {
                inCart ? <PriceAlreadyInCart displayCart={displayCart} /> : <AddPriceToCart displayCart={displayCart} />
            }
        </div>
    )
}

export default Price;