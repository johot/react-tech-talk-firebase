import { observable, action, runInAction } from "mobx";
import { ProductModel, ProductDbModel } from "../product/productModel";
import * as firebase from "firebase";
import * as delay from "delay";

var config = {
  apiKey: "AIzaSyCqsiAe1YxxbUkUg9kytIq_b8zjP4vhbKE",
  authDomain: "matkasse-91a1c.firebaseapp.com",
  databaseURL: "https://matkasse-91a1c.firebaseio.com",
  projectId: "matkasse-91a1c",
  storageBucket: "",
  messagingSenderId: "879553097872"
};

export class Store {
  @observable products: ProductModel[] = [];
  @observable shoppingCartProducts: ProductModel[] = [];
  @observable loadingProducts: boolean = false;
  @observable loadingShoppingCart: boolean = false;

  init = async () => {
    this.loadingProducts = true;
    this.loadingShoppingCart = true;

    firebase.initializeApp(config);
    var productsRef = this._getProductsRef();
    var shoppingCartRef = this._getShoppingCartRef();

    productsRef.on("value", (data: any) => {
      runInAction(() => {
        this.products = this._convertProductData(data.val());

        this.loadingProducts = false;
      });
    });

    shoppingCartRef.on("value", (data: any) => {
      runInAction(() => {
        this.shoppingCartProducts = this._convertProductData(data.val());

        this.loadingShoppingCart = false;
      });
    });
  };

  private _convertProductData = (productData: any) => {
    if (!productData) return [];

    return Object.keys(productData).map<ProductModel>(pid => {
      return {
        productId: pid,
        image: productData[pid].image
          ? productData[pid].image
          : "img/unknown.jpg",
        name: productData[pid].name
      };
    });
  };

  @action
  addShoppingCartProduct(product: ProductModel) {
    var ref = this._getShoppingCartRef();

    let newProduct: ProductDbModel = {
      name: product.name,
      image: product.image
    };

    var newPostKey = ref.push(newProduct);
  }

  @action
  removeShoppingCartProduct(product: ProductModel) {
    var ref = this._getShoppingCartRef();
    ref.child(product.productId).remove();
  }

  private _getShoppingCartRef = (): firebase.database.Reference => {
    return firebase.database().ref("shoppingCart");
  };

  private _getProductsRef = (): firebase.database.Reference => {
    return firebase.database().ref("products");
  };
}
