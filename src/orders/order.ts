import { Product } from "../product/Product";

export interface Order {
  orderTime: string;
  orderId: string;
  customerId: string;
  products: Product[];
}
