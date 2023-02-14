import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {  useSelector } from "react-redux";
import AuthRoutes from "./AuthRoutes"
import ErrorsRoutes from "./ErrorRoutes";
import ApplicationRoutes from "./ApplicationRoutes";

export const MainRoutes = () => {
    const  isAuthorized  = useSelector( ({auth:{user}})=>  user?user.Id!=null:false );
    return (
            <Routes>
                <Route path="/auth/*" element={<AuthRoutes/>} />
                <Route path="/error/*" element={<ErrorsRoutes/>} />
                <Route path="/*" element={isAuthorized?<ApplicationRoutes userLastLocation={"/"} />:<Navigate to="/auth/login" />} />
            </Routes>
    );
};
