import * as React from "react";
import "./App.css";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";
import {
  Button,
  Form,
  Container,
  List,
  Divider,
  Header,
  Card,
  Segment,
  Message,
  Dimmer,
  Loader,
  Menu,
  Input
} from "semantic-ui-react";
import { ProductList } from "./productList/ProductList";
import ShoppingCart from "./shoppingCart/ShoppingCart";
import { Jumbotron } from "./jumbotron/Jumbotron";
import { Store } from "./store/store";
import { ShoppingCartItem } from "./shoppingCart/shoppingCartItemModel";
import { Product } from "./product/Product";
import Grid from "react-awesome-grid";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Orders } from "./orders/Orders";

interface AppProps {
  store?: Store;
}

@inject("store")
@observer
class App extends React.Component<AppProps> {
  @observable nameInput: string = "";

  @action
  changeName = (newName: string) => {
    this.nameInput = newName;
  };

  _addProduct = (product: Product) => {
    this.props.store!.addShoppingCartItem(product);
  };

  _removeProduct = (shoppingCartItem: ShoppingCartItem) => {
    this.props.store!.removeShoppingCartProduct(shoppingCartItem);
  };

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/orders" component={Orders} />
        </div>
      </Router>
    );
  }
}

@inject("store")
@observer
class Home extends React.Component<AppProps> {
  @observable nameInput: string = "";

  @action
  changeName = (newName: string) => {
    this.nameInput = newName;
  };

  _addProduct = (product: Product) => {
    this.props.store!.addShoppingCartItem(product);
  };

  _removeProduct = (shoppingCartItem: ShoppingCartItem) => {
    this.props.store!.removeShoppingCartProduct(shoppingCartItem);
  };

  render() {
    const store = this.props.store!;

    if (store.customerId === "")
      return (
        <Container>
          <Grid horizontalContentAlignment="center" style={{ marginTop: 40 }}>
            <Header size="large">Connys Matkasse login</Header>
            <Segment padded>
              <Header>Vad heter du?</Header>
              <Input
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    store.changeCustomerId(this.nameInput);
                  }
                }}
                action={{
                  content: "Ok",
                  onClick: () => store.changeCustomerId(this.nameInput)
                }}
                placeholder="Ditt namn"
                value={this.nameInput}
                onChange={event => this.changeName((event.target as any).value)}
              />{" "}
            </Segment>
          </Grid>
        </Container>
      );

    return (
      <Container>
        {store.loadingShoppingCart &&
          store.loadingShoppingCart && (
            <Dimmer active>
              <Loader size="massive">Packar upp sortimentet...</Loader>
            </Dimmer>
          )}
        <Jumbotron />
        <Header textAlign="center">{store.customerId}s kasse:</Header>
        <ShoppingCart
          onProductRemoved={this._removeProduct}
          shoppingCartItems={this.props.store!.shoppingCartProducts}
        />
        <Button
          onClick={() => store.makeOrder()}
          disabled={this.props.store!.shoppingCartProducts.length === 0}
          style={{ marginBottom: 20 }}
          fluid
          size="massive"
        >
          Beställ
        </Button>
        <Header textAlign="center">Vårt välsmakande utbud</Header>
        <ProductList
          products={this.props.store!.products}
          onProductClick={this._addProduct}
        />
        <Link to="/orders">Beställningar</Link>
      </Container>
    );
  }
}

export default App;
