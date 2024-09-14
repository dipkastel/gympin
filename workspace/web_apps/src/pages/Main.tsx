import React from 'react';
import _BgTopWave from "../widget/_BgTopWave";
import _WhatIsGympin from "./partials/_WhatIsGympin";
import _WebApplication from "./partials/_WebApplication";
import _WallWave from "../widget/_WallWave";
import _PlaceApplication from "./partials/_PlaceApplication";
import _CorporateApplication from "./partials/_CorporateApplication";
import _WorkWithUs from "./partials/_WorkWithUs";
import _Footer from "./partials/_Footer";

const Main = () => {
    return (
        <div>

            <div className={"main-container"}>
                <_BgTopWave/>
            </div>
            <_WhatIsGympin/>
            <_WebApplication/>
            <_WallWave/>
            <_PlaceApplication />
            <_CorporateApplication />
            <_WorkWithUs />
            <_Footer />
            {/*<Canvas />*/}
            {/*<_PlacesBalls />*/}

        </div>
    );
};

export default Main;
