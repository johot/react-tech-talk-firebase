import * as React from "react";
import { Container, Segment, Header, Divider } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import { Store } from "../store/store";
import { ShoppingCart } from "../shoppingCart/ShoppingCart";
import { Product } from "../product/Product";
import Grid, { Column } from "react-awesome-grid";
import { Link } from "react-router-dom";

export interface OrdersProps {
  store?: Store;
}

@inject("store")
@observer
export class Orders extends React.Component<OrdersProps> {
  componentDidMount() {
    this.props.store!.init();
  }

  render() {
    const store = this.props.store!;

    return (
      <Container>
        <Header style={{ marginTop: 10 }} textAlign="center">
          Beställningar
        </Header>
        {store.orders.reverse().map(o => {
          return (
            <div>
              <Divider horizontal>{o.customerId}</Divider>
              <Header color="grey" as="h5">
                {o.orderTime}
              </Header>
              {o.products.map(p => {
                return <OrderProduct product={p} />;
              })}
            </div>
          );
        })}
        <div style={{ marginTop: 10 }}>
          <Link to={process.env.PUBLIC_URL + "/"}>Hem</Link>
        </div>
      </Container>
    );
  }
}

export interface OrderProductProps {
  product: Product;
}

export default class OrderProduct extends React.Component<
  OrderProductProps,
  any
> {
  render() {
    return (
      <Segment clearing size="large" key={this.props.product.productId}>
        <Grid style={{ height: "40px" }}>
          <Column verticalContentAlignment="center" width="50px">
            <Segment style={{ height: "40px", padding: 5 }}>
              <Grid
                horizontalContentAlignment="center"
                verticalContentAlignment="center"
              >
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%"
                  }}
                  src={this.props.product.image}
                />
              </Grid>
            </Segment>
          </Column>
          <Column verticalContentAlignment="center">
            <b style={{ paddingLeft: 10 }}>{this.props.product.name}</b>
          </Column>
        </Grid>
      </Segment>
    );
  }
}
