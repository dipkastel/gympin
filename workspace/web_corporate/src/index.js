import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './helper/App';
import reportWebVitals from './helper/reportWebVitals';
import swDev from "./helper/swDev"
import {setupAxios} from "./network/setupAxios";
import {createBrowserRouter, RouterProvider} from 'react-router';
import axios from "axios";
import store, {persistor} from "./helper/redux/store";
import {Provider, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter} from "./helper/BrowserRouter";
import {useColorScheme} from "@mui/material";


setupAxios(axios, store);

const router = createBrowserRouter([
    {
        Component: App,
        children: BrowserRouter,
    },
],{});


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <RouterProvider router={router}/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

 swDev();
reportWebVitals();
