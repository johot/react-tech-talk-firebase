import * as React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import Grid, { Column } from "react-awesome-grid";
import { ShoppingCartItem } from "./shoppingCartItemModel";

interface ShoppingCartProps {
  shoppingCartItems: ShoppingCartItem[];
  onProductRemoved: (product: ShoppingCartItem) => void;
}
@observer
export class ShoppingCart extends React.Component<ShoppingCartProps> {
  render() {
    console.log("Rendering ShoppingCart");

    return (
      <>
        {this.props.shoppingCartItems.length > 0 ? (
          <Segment.Group style={{ marginBottom: 40 }}>
            {this.props.shoppingCartItems.map((s, i) => {
              return <ShoppingCartItemDisplay key={s.shoppingCartItemId} shoppingCartItem={s} onProductRemoved={this.props.onProductRemoved} />;
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
  shoppingCartItem: ShoppingCartItem;
  onProductRemoved: (shoppingCartItem: ShoppingCartItem) => void;
}

@observer
export class ShoppingCartItemDisplay extends React.Component<ShoppingCartItemProps> {
  render() {
    return (
      <Segment clearing size="large" key={this.props.shoppingCartItem.shoppingCartItemId}>
        <Grid style={{ height: "40px" }}>
          <Column verticalContentAlignment="center" width="50px">
            <Segment style={{ height: "40px", padding: 5 }}>
              <Grid horizontalContentAlignment="center" verticalContentAlignment="center">
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%"
                  }}
                  src={this.props.shoppingCartItem.product.image}
                />
              </Grid>
            </Segment>
          </Column>
          <Column verticalContentAlignment="center">
            <b style={{ paddingLeft: 10 }}>{this.props.shoppingCartItem.product.name}</b>
          </Column>
          <Column verticalContentAlignment="center" width="120px">
            <Button floated="right" onClick={() => this.props.onProductRemoved(this.props.shoppingCartItem)}>
              Ta bort
            </Button>
          </Column>
        </Grid>
      </Segment>
    );
  }
}

export default ShoppingCart;
