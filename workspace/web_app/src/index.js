import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './helper/App';
import reportWebVitals from './helper/reportWebVitals';
import swDev from "./helper/swDev"
import {setupAxios} from "./helper/setupAxios";
import axios from "axios";
import store, { persistor } from "./helper/redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";


setupAxios(axios, store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>

    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>

    // </React.StrictMode>
);
swDev();
reportWebVitals();
