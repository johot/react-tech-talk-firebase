import * as React from "react";
import { Card } from "semantic-ui-react";
import { Grid } from "react-awesome-grid";
import { css } from "glamor";
import MediaQuery from "react-responsive";
import { Responsive } from "../common/Responsive";
import { Product } from "./Product";

interface ProductProps {
  product: Product;
  onClick: (produt: Product) => void;
}

export const ProductDisplay = (props: ProductProps) => (
  <div
    style={{
      padding: 10,
      height: "100%",
      width: "100%"
    }}
  >
    <Card
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white"
      }}
      onClick={() => props.onClick(props.product)}
    >
      <Grid style={{ height: "100%" }} horizontalContentAlignment="center" verticalContentAlignment="center">
        <img
          style={{
            padding: 5,
            maxWidth: "100%",
            maxHeight: "100%"
          }}
          src={props.product.image}
        />
      </Grid>
      <Card.Content>
        <Responsive desktopStyle={null} mobileStyle={{ fontSize: "15px" }}>
          {style => <Card.Header style={style}>{props.product.name}</Card.Header>}
        </Responsive>
      </Card.Content>
    </Card>
  </div>
);
