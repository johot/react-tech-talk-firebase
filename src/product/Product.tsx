import * as React from "react";
import { Card } from "semantic-ui-react";
import { Grid } from "react-awesome-grid";
import { ProductModel } from "./productModel";
import { css } from "glamor";
import MediaQuery from "react-responsive";

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
        <MediaQuery query="(max-width: 700px)">
          {matches => {
            return (
              <Card.Header
                style={{
                  //wordWrap: "break-word",
                  fontSize: matches ? "15px" : null
                }}
              >
                {props.product.name}
              </Card.Header>
            );
          }}
        </MediaQuery>
      </Card.Content>
    </Card>
  </div>
);
