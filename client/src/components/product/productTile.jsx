import React, { Fragment } from "react";
import { Card, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import Price from "./price";
import { addProductToCart, getProductFromCart, toggleCartOpen } from "../actions";

const productTile = ({ id, imageSource, name, description, prices, inCart, productFromCart, addProductToCart, toggleCartOpen }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleAddToCart = (productId, priceId) => {
        addProductToCart(productId, priceId);
        scrollToTop();
        toggleCartOpen()
    }
   return (
    <Card raised>
        <Image src={imageSource} wrapped ui={false} />
        <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content>
            <Card.Description><h4><i>Pricing</i></h4></Card.Description>
            <br />
            <Card.Description>
                {
                    prices.map((price) => (
                        <Fragment key={price.id}>
                            <Price key={price.id} displayCart={true} inCart={inCart && productFromCart.priceId === price.id} addToCart={()=> handleAddToCart(id, price.id)} {...price} />
                            <br />
                            <br />
                        </Fragment>
                    ))
                }
            </Card.Description>
        </Card.Content>
    </Card>
   );
}
const mapStateToProps = (state, props) => {
    const {id} = props;
    const productFromCart = getProductFromCart(state, id);
    return {
        inCart: !!productFromCart,
        productFromCart,
    };
}

export default connect(mapStateToProps, {addProductToCart, toggleCartOpen})(productTile);