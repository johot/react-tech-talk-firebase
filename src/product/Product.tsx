import * as React from "react";
import { Card } from "semantic-ui-react";
import { Grid } from "react-awesome-grid";
import { ProductModel } from "./productModel";
import { css } from "glamor";
import MediaQuery from "react-responsive";
import { Responsive } from "../common/Responsive";

interface ProductProps {
  product: ProductModel;
  onClick: (produt: ProductModel) => void;
}

export const Product = (props: ProductProps) => (
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
