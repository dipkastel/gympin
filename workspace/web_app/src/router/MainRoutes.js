import React from "react";
import {Route, Routes} from "react-router-dom";
import ErrorsRoutes from "./ErrorRoutes";
import ApplicationRoutes from "./ApplicationRoutes";
import {saveLastLocation} from "../helper/lastLocationHandler";

export const MainRoutes = () => {
    saveLastLocation("lastLocation");

    return (

            <Routes>
                <Route path="/error/*" element={<ErrorsRoutes/>} />
                <Route path="/*" element={<ApplicationRoutes userLastLocation={"/"} />} />
            </Routes>
    );
};
