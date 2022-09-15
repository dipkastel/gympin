import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import AuthRoutes from "./AuthRoutes"
import ErrorsRoutes from "./ErrorRoutes";
import * as routerHelpers from "../router/RouterHelpers";
import ApplicationRoutes from "./ApplicationRoutes";

export const MainRoutes = () => {
    routerHelpers.saveLastLocation("lastLocation");
    const { isAuthorized } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.user != null,
        }),
        shallowEqual
    );

    return (

            <Routes>
                <Route path="/auth/*" element={<AuthRoutes/>} />
                <Route path="/error/*" element={<ErrorsRoutes/>} />
                <Route path="/*" element={isAuthorized?<ApplicationRoutes userLastLocation={"/"} />:<Navigate to="/auth/login" />} />
            </Routes>
    );
};
