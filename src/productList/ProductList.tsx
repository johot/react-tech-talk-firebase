import * as React from "react";
//import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react";
import Grid, { Column, Row } from "react-awesome-grid";
import { ProductDisplay } from "../product/ProductDisplay";
import { Product } from "../product/Product";

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

// @observer
export class ProductList extends React.PureComponent<ProductListProps> {
  render() {
    console.log("Rendering ProductList");

    let productGroups: ((Product | null)[])[] = [];
    let size = 3;

    let productsCopy = this.props.products.slice();

    while (productsCopy.length > 0) {
      productGroups.push(productsCopy.splice(0, size));
    }

    const lastIndex = productGroups.length - 1;

    // Make sure last product group is filled
    while (productGroups.length > 0 && productGroups[lastIndex].length < size) {
      productGroups[lastIndex].push(null);
    }

    const products = productGroups.map((group, groupIndex) => {
      return (
        <Row key={groupIndex} height="200px">
          {group.map((p, i) => {
            return <Column key={i}>{p && <ProductDisplay key={p.productId} onClick={p => this.props.onProductClick(p)} product={p} />}</Column>;
          })}
        </Row>
      );
    });

    return <Grid>{products}</Grid>;
  }
}
