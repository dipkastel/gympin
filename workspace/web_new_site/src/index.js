import React from 'react';
import App from './App.js';
import "./helper/scss/style.css"
import {createRoot, hydrateRoot} from 'react-dom/client';


const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
    console.log("hydrateRoot")
    hydrateRoot(
        rootElement,
        <React.StrictMode>
            <App />
        </React.StrictMode>
        );
} else {
    console.log("createRoot")
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
}
