import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ErrorsRoutes from "./ErrorRoutes";
import * as routerHelpers from "../router/RouterHelpers";
import ApplicationRoutes from "./ApplicationRoutes";

export const MainRoutes = () => {
    routerHelpers.saveLastLocation("lastLocation");

    return (

            <Routes>
                <Route path="/error/*" element={<ErrorsRoutes/>} />
                <Route path="/*" element={<ApplicationRoutes userLastLocation={"/"} />} />
            </Routes>
    );
};
