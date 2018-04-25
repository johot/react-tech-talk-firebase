import * as React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { ProductModel } from "../product/productModel";
import { observer } from "mobx-react";
import Grid, { Column } from "react-awesome-grid";

interface ShoppingCartProps {
  products: ProductModel[];
  onProductRemoved: (product: ProductModel) => void;
}
@observer
export class ShoppingCart extends React.Component<ShoppingCartProps> {
  render() {
    console.log("Rendering ShoppingCart");

    return (
      <>
        <Header textAlign="center">I din kasse</Header>
        {this.props.products.length > 0 ? (
          <Segment.Group style={{ marginBottom: 40 }}>
            {this.props.products.map((p, i) => {
              return (
                <ShoppingCartItem
                  key={p.productId}
                  product={p}
                  onProductRemoved={this.props.onProductRemoved}
                />
              );
            })}
          </Segment.Group>
        ) : (
          <Segment.Group style={{ marginBottom: 40 }}>
            <Header style={{ margin: 10 }} textAlign="center">
              Det finns inget i din kasse än
            </Header>
          </Segment.Group>
        )}
      </>
    );
  }
}

interface ShoppingCartItemProps {
  product: ProductModel;
  onProductRemoved: (product: ProductModel) => void;
}

export const ShoppingCartItem = (props: ShoppingCartItemProps) => (
  <Segment clearing size="large" key={props.product.productId}>
    <Grid style={{ height: "60px" }}>
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
              src={props.product.image}
            />
          </Grid>
        </Segment>
      </Column>
      <Column verticalContentAlignment="center">
        <b style={{ paddingLeft: 10 }}>{props.product.name}</b>
      </Column>
      <Column verticalContentAlignment="center" width="120px">
        <Button
          floated="right"
          onClick={() => props.onProductRemoved(props.product)}
        >
          Ta bort
        </Button>
      </Column>
    </Grid>
  </Segment>
);

export default ShoppingCart;
