import React from "react";
import { Loader, Card } from "semantic-ui-react";
import ProductTile from "./product/productTile";



export const ProductGrid = ({ columns = 3, data, loading }) => {

    if (loading) {
        return <Loader>Loading Products</Loader>;
    }

    if (data && Array.isArray(data) && data.length > 0) {
        return (
            <Card.Group itemsPerRow={columns} centered>
                {data.map(product => {
                    const { name, description, images, id, prices } = product;
                    const imageSrc = images[0];
                    const priceArray = prices.map(price => {
                        const { unit_amount, currency, id, transform_quantity } = price;
                        const divide_by = transform_quantity?.divide_by;
                        return {
                            id,
                            currency,
                            amount: unit_amount,
                            units: divide_by
                        }
                    })
                    return <ProductTile key={id} id={id} name={name} description={description} imageSource={imageSrc} prices={priceArray} />;
                })}
            </Card.Group>
        )
    }
    else {
        return <div>No Products Available</div>
    }
}

export default ProductGrid;