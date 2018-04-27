import { observable, action, runInAction } from "mobx";
import * as firebase from "firebase";
import * as delay from "delay";
import { ShoppingCartItem } from "../shoppingCart/shoppingCartItemModel";
import { Product } from "../product/Product";
import { Order } from "../orders/order";

var config = {
  apiKey: "AIzaSyCqsiAe1YxxbUkUg9kytIq_b8zjP4vhbKE",
  authDomain: "matkasse-91a1c.firebaseapp.com",
  databaseURL: "https://matkasse-91a1c.firebaseio.com",
  projectId: "matkasse-91a1c",
  storageBucket: "",
  messagingSenderId: "879553097872"
};

export class Store {
  @observable products: Product[] = [];
  @observable shoppingCartProducts: ShoppingCartItem[] = [];
  @observable loadingProducts: boolean = false;
  @observable loadingShoppingCart: boolean = false;
  @observable customerId: string = "";
  @observable orders: Order[] = [];

  private _initialized: boolean = false;

  init = async () => {
    if (this._initialized) return;

    this.loadingProducts = true;
    this.loadingShoppingCart = true;

    firebase.initializeApp(config);

    // Get db references
    var productsRef = this._getProductsRef();
    var shoppingCartRef = this._getShoppingCartRef(this.customerId);
    var ordersRef = this._getOrdersRef();

    productsRef.on("value", (data: firebase.database.DataSnapshot) => {
      runInAction(() => {
        this.products = this._convertProductData(data.val());
        this.loadingProducts = false;

        // Since we replaced the products with new object we must update all shopping cart items also
        this._remapShoppingCartItemProducts();
      });
    });

    shoppingCartRef.on("value", (data: firebase.database.DataSnapshot) => {
      runInAction(() => {
        // We remap these to existing products
        const shoppingCartProducts: ShoppingCartItem[] = [];

        data.forEach(x => {
          const productId = x.val().productId;
          const existingProduct = this.products.find(
            p => p.productId === productId
          );

          if (existingProduct) {
            shoppingCartProducts.push({
              shoppingCartItemId: x.key!,
              product: existingProduct!
            });
          }

          // Keep iterating
          return false;
        });

        this.shoppingCartProducts = shoppingCartProducts;

        this.loadingShoppingCart = false;
      });
    });

    ordersRef.on("value", (data: firebase.database.DataSnapshot) => {
      const orders: Order[] = [];

      data.forEach(x => {
        const orderId = x.key;
        const order = x.val();
        const productIds: string[] = order.products;

        // Create product list
        const productList: Product[] = [];

        productIds.forEach(x => {
          const matchingProduct = this.products.find(p => p.productId === x);

          if (matchingProduct) productList.push(matchingProduct);
        });

        orders.push({
          orderTime: order.orderTime,
          orderId: orderId!,
          customerId: order.customerId,
          products: productList
        });

        return false;
      });

      runInAction(() => {
        this.orders = orders;
      });
    });

    this._initialized = true;
  };

  private _convertProductData = (productData: any) => {
    if (!productData) return [];

    return Object.keys(productData).map<Product>(pid => {
      return {
        productId: pid,
        image: productData[pid].image
          ? productData[pid].image
          : "img/unknown.jpg",
        name: productData[pid].name
      };
    });
  };

  private _remapShoppingCartItemProducts = () => {
    this.shoppingCartProducts.forEach(s => {
      const matchingProduct = this.products.find(
        p => p.productId === s.product.productId
      );
      if (matchingProduct) {
        s.product = matchingProduct;
      }
    });
  };

  @action
  changeCustomerId = (newName: string) => {
    this.customerId = newName;

    this.init();
  };

  @action
  addShoppingCartItem = (product: Product) => {
    var ref = this._getShoppingCartRef(this.customerId);

    const shoppingCartDbItem: ShoppingCartDbItem = {
      productId: product.productId,
      timeAdded: new Date().toLocaleString()
    };

    var newPostKey = ref.push(shoppingCartDbItem);
  };

  @action
  makeOrder = () => {
    const productKeys = this.shoppingCartProducts.map(s => {
      return s.product.productId;
    });

    const order: OrderDbModel = {
      customerId: this.customerId,
      orderTime: new Date().toLocaleString(),
      products: productKeys
    };

    var newOrderPost = this._getOrdersRef().push(order);

    // Clear shopping cart
    this._getShoppingCartRef(this.customerId).set({});

    alert("Tack för din beställning " + this.customerId + "!");
  };

  @action
  removeShoppingCartProduct = (shoppingCartItemModel: ShoppingCartItem) => {
    var ref = this._getShoppingCartRef(this.customerId);
    ref.child(shoppingCartItemModel.shoppingCartItemId).remove();
  };

  // Utility

  private _getOrdersRef = (): firebase.database.Reference => {
    return firebase.database().ref("orders");
  };

  private _getShoppingCartRef = (
    customerId: string
  ): firebase.database.Reference => {
    return firebase.database().ref("shoppingCarts/" + customerId);
  };

  private _getProductsRef = (): firebase.database.Reference => {
    return firebase.database().ref("products");
  };
}

interface ShoppingCartDbItem {
  productId: string;
  timeAdded: string;
}

interface ProductDb {
  name: string;
  image: string;
}

interface OrderDbModel {
  customerId: string;
  orderTime: string;
  products: string[];
}
