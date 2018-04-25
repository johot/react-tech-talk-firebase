import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
// *** REMEMBER TO ADD BACK @observer on sub components --->
import App from "./App";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import { Store } from "./store/store";
import CounterApp from "./CounterApp";

configure({ enforceActions: true });

// *** MobX ***
let store = new Store();
//store.products = getProducts();
store.init();

//console.log(JSON.stringify(getProducts()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
