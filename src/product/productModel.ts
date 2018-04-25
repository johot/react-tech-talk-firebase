export interface ProductModel extends ProductDbModel {
  productId: string;
}

export interface ProductDbModel {
  name: string;
  image: string;
}
