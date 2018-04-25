import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { OuterApp } from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<OuterApp />, document.getElementById("root"));
registerServiceWorker();
