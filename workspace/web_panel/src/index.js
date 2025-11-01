import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import store, {persistor} from "./helper/redux/store";
import App from "./router/App";
import {setupAxios} from "./network/setupAxios";
import axios from "axios";
import "./sass/style.react.rtl.css"; // RTL version
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/plugins/line-awesome/css/line-awesome.css";
import "./assets/plugins/flaticon/flaticon.css";
import "./assets/plugins/flaticon2/flaticon.css";
import swDev from "./helper/swDev";

const { PUBLIC_URL } = process?.env;

setupAxios(axios, store);
ReactDOM.render(
  <App store={store} persistor={persistor} basename={PUBLIC_URL} />,
  document.getElementById("root")
);

swDev();
