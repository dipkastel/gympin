import React from 'react';
import {Figure} from "react-bootstrap";
import {toAbsoluteUrl} from "../helper/utils";

export default function NOfflineMode(props) {
    return (
        <>
            <div className="force-center">
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="noInternet"
                        src={toAbsoluteUrl("/assets/images/noInternet.png")}
                    />
                </Figure>
                <h1>اتصال خود به شبکه را بررسی نمایید</h1>
            </div>
        </>
    );
}

