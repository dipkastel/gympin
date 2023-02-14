import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import ErrorsRoutes from "./ErrorRoutes";
import ApplicationRoutes from "./ApplicationRoutes";
import AuthRoutes from "./AuthRoutes";

export const MainRoutes = () => {

    const  isAuthorized  = useSelector( ({auth:{token}})=>  token!=null);

    return (

        <Routes>
            <Route path="/auth/*" element={<AuthRoutes/>}/>
            <Route path="/error/*" element={<ErrorsRoutes/>}/>
            <Route path="/*"
                   element={isAuthorized ? <ApplicationRoutes userLastLocation={"/"}/> : <Navigate to="/auth/login"/>}/>
        </Routes>
    );
};
