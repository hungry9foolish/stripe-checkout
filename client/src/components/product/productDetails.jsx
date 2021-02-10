import React, { useEffect, useState } from "react";
import { Icon, Loader, Grid, Button, Image, Segment, Input, IconGroup } from "semantic-ui-react";
import axios from "axios";
import Price from "./price";

const ProductDetails = ({ id, imageSrc, description, prices, quantity=0, removeFromCart, updateProductQuantityInCart }) => {
    return (
        <Segment>
            <Icon circular name="close" style={{float: "right"}} onClick={() => removeFromCart(id)} />
            <Grid columns={2}>
                    <Grid.Column width={6}>
                        <Grid.Row>
                            <Image src={imageSrc} size='small' description={description} />
                        </Grid.Row>

                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Grid.Row>
                            <p>{description}</p>
                        </Grid.Row>
                        <br/>
                        <Grid.Row>
                            <b>Pricing</b>
                        </Grid.Row>
                        <Grid.Row>
                                {prices.map(price => (<Price key={price.id} {...price} addToCart={()=> {}} displayCart={false} />))}
                        </Grid.Row>
                        {/*
                        <Grid.Row>
                            <Input label={"Quantity"} size="mini" name={`quantity-${id}`} value={quantity} onChange={(event) => updateProductQuantityInCart(id, event.target.value)}/>
                        </Grid.Row>
                        */}
                    </Grid.Column>
            </Grid>
        </Segment>
    );
}

export default ProductDetails;