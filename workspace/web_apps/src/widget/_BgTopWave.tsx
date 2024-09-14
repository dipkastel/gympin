import React from 'react';
import "../style/wave.css"
import {toAbsoluteUrl} from "../utils/utils";


const _BgTopWave = () => {
    return (
        <div>
            <div className="wrapper">
                <div className="wave"></div>
                {/*<div className="wave2"></div>*/}
            </div>
            <div className="wave-box">
                <img src={toAbsoluteUrl("/assets/images/roo-ghermez.png")} className="wave-logo" alt="logo" />
            </div>
        </div>
    );
};

export default _BgTopWave;
