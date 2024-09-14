import React from 'react';
import '../style/App.css';
import _BgTopWave from "../widget/_BgTopWave";
import _WhatIsGympin from "./partials/_WhatIsGympin";
import _WebApplication from "./partials/_WebApplication";
import _PlaceApplication from "./partials/_PlaceApplication";
import _CorporateApplication from "./partials/_CorporateApplication";
import _WorkWithUs from "./partials/_WorkWithUs";
import _Footer from "./partials/_Footer";
import _WallWave from "../widget/_WallWave";
import Main from "./Main";

function App() {
    return (
        <div className="App">
            <div className="myContainer">
                <Main />
            </div>
        </div>
    );
}

export default App;
