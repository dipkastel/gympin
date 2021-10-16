import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { setupAxios } from "./_metronic";
import store, { persistor } from "./app/store/store";
import App from "./App";
import "./sass/style.react.rtl.css"; // RTL version
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/line-awesome/css/line-awesome.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";
const { PUBLIC_URL } = process.env;

setupAxios(axios, store);

ReactDOM.render(
  <App
    store={store}
    persistor={persistor}
    basename={PUBLIC_URL}
  />,
  document.getElementById("root")
);
