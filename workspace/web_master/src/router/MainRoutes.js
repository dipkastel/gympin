import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import AuthRoutes from "./AuthRoutes"
import ErrorsRoutes from "./ErrorRoutes";
import ApplicationRoutes from "./ApplicationRoutes";
import {saveLastLocation} from "../helper/lastLocationHandler";

export const MainRoutes = () => {
    const { isAuthorized } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.authToken != null,
        }),
        shallowEqual
    );
    console.log(isAuthorized)
    return (

            <Routes>
                <Route path="/auth/*" element={<AuthRoutes/>} />
                <Route path="/error/*" element={<ErrorsRoutes/>} />
                <Route path="/*" element={isAuthorized?<ApplicationRoutes userLastLocation={"/"} />:<Navigate to="/auth/login" />} />
            </Routes>
    );
};
