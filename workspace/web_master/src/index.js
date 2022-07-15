import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './helper/App';
import reportWebVitals from './helper/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import swDev from "./helper/swDev"
import {setupAxios} from "./helper/setupAxios";
import axios from "axios";
import store, { persistor } from "./helper/store";
const { PUBLIC_URL } = process.env;


setupAxios(axios, store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
            <App store={store} persistor={persistor} basename={PUBLIC_URL}/>

    // </React.StrictMode>
);
swDev();
reportWebVitals();
