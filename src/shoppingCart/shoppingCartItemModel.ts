import { Product } from "../product/Product";

export interface ShoppingCartItem {
  shoppingCartItemId: string;
  product: Product;
}
