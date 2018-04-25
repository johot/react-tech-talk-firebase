import * as React from "react";
import "./App.css";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import { Button, Form, Container, List, Divider, Header, Grid, Card, Segment, Message, Dimmer, Loader, Menu } from "semantic-ui-react";
import { Product } from "./product/Product";
import { ProductModel } from "./product/productModel";
import { ProductList } from "./productList/ProductList";
import ShoppingCart from "./shoppingCart/ShoppingCart";
import { Jumbotron } from "./jumbotron/Jumbotron";
import { Store } from "./store/store";

interface MobXAppProps {
  store?: Store;
}

@inject("store")
@observer
class App extends React.Component<MobXAppProps> {
  _addProduct = (product: ProductModel) => {
    this.props.store!.addShoppingCartProduct(product);
  };

  _removeProduct = (product: ProductModel) => {
    this.props.store!.removeShoppingCartProduct(product);
  };

  render() {
    const store = this.props.store!;

    return (
      <Container>
        {/* <Menu>
          <Menu.Item name="home">Hem</Menu.Item>
          <Menu.Item name="admin">Admin</Menu.Item>
        </Menu> */}
        {store.loadingShoppingCart &&
          store.loadingShoppingCart && (
            <Dimmer active>
              <Loader size="massive">Packar upp sortimentet...</Loader>
            </Dimmer>
          )}
        <Jumbotron />
        <ProductList products={this.props.store!.products} onProductClick={this._addProduct} />
        <ShoppingCart onProductRemoved={this._removeProduct} products={this.props.store!.shoppingCartProducts} />
        <Button disabled={this.props.store!.shoppingCartProducts.length === 0} style={{ marginBottom: 20 }} fluid size="massive">
          Beställ
        </Button>
      </Container>
    );
  }
}

export default App;
