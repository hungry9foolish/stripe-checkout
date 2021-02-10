import React, { useEffect } from "react";
import ProductGrid from "./productGrid";
import { Container, Sidebar } from "semantic-ui-react";
import { connect } from "react-redux";
import { createMedia } from "@artsy/fresnel";
import PageHeader from "./header";
import CartSidebar from "./cart/cartSidebar";
import { getProductsWithPrices } from "./actions";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1024,
    xl: 1192,
  },
})

const MainAppContents = ({data, loading}) => (
  <Container >
    <MediaContextProvider>
      <Media greaterThanOrEqual="xl">
        <ProductGrid columns={5} data={data} loading={loading} />
      </Media>
      <Media at="lg">
        <ProductGrid columns={5} data={data} loading={loading} />
      </Media>
      <Media at="md">
        <ProductGrid columns={3} data={data} loading={loading}/>
      </Media>
      <Media at="sm">
        <ProductGrid columns={1} data={data} loading={loading}/>
      </Media>
    </MediaContextProvider>
  </Container>
);

function MarketPlace({getProductsWithPrices, data, loading, cartOpen, stripeStatus}) {
  useEffect(() => {
    getProductsWithPrices();
  },[])
  return (
    <div>
      <PageHeader/>
      <br/>
      <Sidebar.Pushable>
        <CartSidebar/>
        <Sidebar.Pusher dimmed={cartOpen}>
          <MainAppContents data={data} loading={loading}/>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.products.data,
  loading: state.products.loading,
  cartOpen: state.cart.cartOpen
});

export default connect(mapStateToProps, {getProductsWithPrices})(MarketPlace);
